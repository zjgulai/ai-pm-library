declare module "animejs" {
  interface AnimeInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    finished: Promise<void>;
  }

  interface AnimeParams {
    targets?: any;
    duration?: number | ((el: any, i: number, total: number) => number);
    delay?: number | ((el: any, i: number, total: number) => number);
    endDelay?: number | ((el: any, i: number, total: number) => number);
    easing?: string;
    round?: number | boolean;
    direction?: "normal" | "reverse" | "alternate";
    loop?: number | boolean;
    autoplay?: boolean;
    begin?: (anim: AnimeInstance) => void;
    complete?: (anim: AnimeInstance) => void;
    update?: (anim: AnimeInstance) => void;
    run?: (anim: AnimeInstance) => void;
    begin?: (anim: AnimeInstance) => void;
    [prop: string]: any;
  }

  function anime(params: AnimeParams): AnimeInstance;
  namespace anime {
    function stagger(value: number | string | any[], options?: any): any;
    function timeline(params?: AnimeParams): any;
    function set(targets: any, properties: any): void;
    function random(min: number, max: number): number;
    const running: AnimeInstance[];
    const easings: Record<string, (t: number) => number>;
    const speed: number;
    const suspendWhenDocumentHidden: boolean;
  }
  export default anime;
}
