import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import AjvLib from "ajv";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDir, "..");
const DEFAULT_SUPPORTED_CONTRACT_SCHEMA_MAJOR = "1";
const sourcePath = process.env.CATALOG_SOURCE_PATH
  ? resolve(appRoot, process.env.CATALOG_SOURCE_PATH)
  : resolve(appRoot, "src/data/catalogSource.json");
const contractPath = process.env.CATALOG_SOURCE_CONTRACT_PATH
  ? resolve(appRoot, process.env.CATALOG_SOURCE_CONTRACT_PATH)
  : resolve(scriptDir, "catalog-source-contract.json");
const contractSchemaPath = process.env.CATALOG_SOURCE_CONTRACT_SCHEMA_PATH
  ? resolve(appRoot, process.env.CATALOG_SOURCE_CONTRACT_SCHEMA_PATH)
  : resolve(scriptDir, "catalog-source-contract.schema.json");
const outputDir = process.env.CATALOG_OUTPUT_DIR
  ? resolve(appRoot, process.env.CATALOG_OUTPUT_DIR)
  : resolve(appRoot, "public/catalog");
const checkOnly = process.argv.includes("--check");
const catalogContractSchema = loadCatalogContractSchema();
const ajv = new AjvLib({ allErrors: true });
const supportedSchemaMajor = parseSupportedContractSchemaMajor(
  process.env.CATALOG_SOURCE_CONTRACT_SUPPORTED_MAJOR ?? DEFAULT_SUPPORTED_CONTRACT_SCHEMA_MAJOR
);

function assertValid(condition, message) {
  if (!condition) {
    throw new Error(`Invalid catalog source: ${message}`);
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function loadCatalogContract() {
  const contract = loadJsonFile(contractPath, "contract");
  validateCatalogContract(contract);
  return contract;
}

function loadCatalogContractSchema() {
  const schema = loadJsonFile(contractSchemaPath, "contract schema");
  assertValid(isRecord(schema), "contract schema must be an object");
  return schema;
}

function loadJsonFile(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Invalid catalog ${label}: ${error instanceof Error ? error.message : "unknown parse error"}`);
  }
}

function parseSupportedContractSchemaMajor(raw) {
  const numeric = Number.parseInt(raw, 10);
  assertValid(Number.isInteger(numeric) && numeric >= 1, `supported contract schema major must be a positive integer, got ${raw}`);
  return numeric;
}

function validateCatalogContract(contract) {
  const validate = ajv.compile(catalogContractSchema);
  const isValid = validate(contract);
  const errors = (validate.errors || [])
    .map((error) => `${error.instancePath || "root"}: ${error.message}`)
    .join("; ");
  assertValid(isValid, `contract must satisfy schema: ${errors}`);

  const [schemaMajor] = contract.schemaVersion.split(".");
  const parsedSchemaMajor = Number.parseInt(schemaMajor, 10);
  assertValid(Number.isInteger(parsedSchemaMajor), "contract schemaVersion major must be a valid integer");
  assertValid(
    parsedSchemaMajor === supportedSchemaMajor,
    `contract schemaVersion major must be ${supportedSchemaMajor}, got ${contract.schemaVersion}`
  );

  assertValid(contract.collections && isRecord(contract.collections), "contract.collections must be an object");
  for (const collectionName of Object.keys(contract.collections)) {
    assertValid(contract.collections[collectionName] && isRecord(contract.collections[collectionName]), `collection ${collectionName} must be an object`);
  }

  assertValid(
    contract.validations.sourceSkillCategories.includes("prompt"),
    "contract validations.sourceSkillCategories must include prompt"
  );
}

function loadCatalogSource(contract) {
  const catalogSource = loadJsonFile(sourcePath, "source");
  validateCatalogSource(catalogSource, contract);
  return catalogSource;
}

function validateCatalogSource(catalogSource, contract) {
  const {
    requiredTopLevelCollections,
    requiredStringFields,
    requiredStringArrayFields,
    nonNegativeIntegerFields,
    sourceSkillCategories,
  } = contract.validations;
  const sourceSkillCategorySet = new Set(sourceSkillCategories);
  const sourceSkillCategoryList = [...sourceSkillCategorySet];

  assertValid(isRecord(catalogSource), "root must be an object");

  for (const collectionName of requiredTopLevelCollections) {
    const items = catalogSource[collectionName];
    const collectionSpec = contract.collections[collectionName];
    const requiredCategory = collectionSpec?.requiredCategory ?? null;

    assertValid(Array.isArray(items), `${collectionName} must be an array`);
    assertValid(items.length > 0, `${collectionName} must not be empty`);
    assertValid(
      collectionSpec &&
        isRecord(collectionSpec) &&
        typeof collectionSpec.name === "string" &&
        collectionSpec.name.trim().length > 0,
      `${collectionName} spec in contract must include a non-empty name`
    );
    validateCatalogItems({
      collectionName,
      items,
      requiredCategory,
      requiredStringFields,
      requiredStringArrayFields,
      nonNegativeIntegerFields,
      sourceSkillCategorySet,
      sourceSkillCategoryList,
    });
  }
}

function validateCatalogItems({
  collectionName,
  items,
  requiredCategory,
  requiredStringFields,
  requiredStringArrayFields,
  nonNegativeIntegerFields,
  sourceSkillCategorySet,
  sourceSkillCategoryList,
}) {
  const seenIds = new Set();

  items.forEach((item, index) => {
    const itemPath = `${collectionName}[${index}]`;
    assertValid(isRecord(item), `${itemPath} must be an object`);

    for (const field of nonNegativeIntegerFields) {
      assertValid(
        Number.isInteger(item[field]) && item[field] >= 0,
        `${itemPath}.${field} must be a non-negative integer`
      );
    }

    assertValid(!seenIds.has(item.id), `${collectionName} contains duplicate id: ${item.id}`);
    seenIds.add(item.id);

    for (const field of requiredStringFields) {
      assertValid(
        typeof item[field] === "string" && item[field].trim().length > 0,
        `${itemPath}.${field} must be a non-empty string`
      );
    }

    for (const field of requiredStringArrayFields) {
      assertValid(
        Array.isArray(item[field]) &&
          item[field].length > 0 &&
          item[field].every((value) => typeof value === "string" && value.trim().length > 0),
        `${itemPath}.${field} must be a non-empty string array`
      );
    }

    if (requiredCategory) {
      assertValid(item.category === requiredCategory, `${itemPath}.category must be ${requiredCategory}`);
    } else {
      assertValid(
        sourceSkillCategorySet.has(item.category),
        `${itemPath}.category must be one of: ${sourceSkillCategoryList.join(", ")}`
      );
    }
  });
}

function loadCatalogCollections(catalogSource, contract) {
  const { requiredTopLevelCollections, sourceSkillCategories } = contract.validations;
  const sourceSkillSet = new Set(sourceSkillCategories);
  const promptsCollection = requiredTopLevelCollections.find((name) => {
    const collectionSpec = contract.collections[name];
    return collectionSpec?.requiredCategory === "prompt";
  });

  const promptItems = promptsCollection ? catalogSource[promptsCollection] ?? [] : [];
  const skillItems = [];

  for (const collectionName of requiredTopLevelCollections) {
    if (collectionName === promptsCollection) {
      continue;
    }

    const items = catalogSource[collectionName] ?? [];
    skillItems.push(...items.filter((item) => sourceSkillSet.has(item.category)));
  }

  return {
    prompts: promptItems,
    skills: skillItems,
  };
}

function buildCatalogFiles(catalogSource, contract) {
  const { prompts, skills } = loadCatalogCollections(catalogSource, contract);
  const { publicCatalogCategories } = contract.validations;
  const itemsByCategory = {
    prompt: prompts,
    skill: skills.filter((item) => item.category === "skill"),
    hook: skills.filter((item) => item.category === "hook"),
    mcp: skills.filter((item) => item.category === "mcp"),
    agent: skills.filter((item) => item.category === "agent"),
    github: skills.filter((item) => item.category === "github"),
    plugin: skills.filter((item) => item.category === "plugin"),
  };
  const manifest = {
    generatedFrom: contract.generatedFrom,
    categories: {},
  };
  const files = new Map();

  for (const category of publicCatalogCategories) {
    const items = itemsByCategory[category];
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(`Catalog category has no items: ${category}`);
    }

    manifest.categories[category] = {
      count: items.length,
      path: `/catalog/${category}.json`,
    };
    files.set(`${category}.json`, `${JSON.stringify(items, null, 2)}\n`);
  }

  files.set("manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
  return { files, manifest };
}

function writeCatalog(files) {
  mkdirSync(outputDir, { recursive: true });
  for (const [fileName, contents] of files) {
    writeFileSync(resolve(outputDir, fileName), contents);
  }
}

function checkCatalog(files) {
  const mismatches = [];

  for (const [fileName, contents] of files) {
    const existing = readFileSync(resolve(outputDir, fileName), "utf8");
    if (existing !== contents) {
      mismatches.push(fileName);
    }
  }

  if (mismatches.length > 0) {
    throw new Error(`Catalog assets are stale: ${mismatches.join(", ")}`);
  }
}

const contract = loadCatalogContract();
const catalogSource = loadCatalogSource(contract);
const { files, manifest } = buildCatalogFiles(catalogSource, contract);

if (checkOnly) {
  checkCatalog(files);
  console.log("catalog:check passed");
} else {
  writeCatalog(files);
  console.log(JSON.stringify(manifest.categories, null, 2));
}
