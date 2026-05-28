export interface Prompt {
  id: number;
  title: string;
  titleEn: string;
  role: string;
  tags: string[];
  tagsEn: string[];
  content: string;
  description: string;
  descriptionEn: string;
  scenario: string;
  scenarioEn: string;
  problemFocus: string;
  problemFocusEn: string;
  author: string;
  likes: number;
  views: string;
  comments: number;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  count: number;
}
