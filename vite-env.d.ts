/// <reference types="vite/client" />

// ImportMeta 확장
interface ImportMeta {
  readonly env: ImportMetaEnv;
  glob: ImportMetaGlobFunction;
}

// ImportMetaGlobFunction 타입 정의
interface ImportMetaGlobFunction {
  <Eager extends boolean = false, T = unknown>(
    glob: string,
    options?: ImportMetaGlobOptions<Eager>
  ): Eager extends true ? Record<string, T> : Record<string, () => Promise<T>>;
}

// ImportMetaGlobOptions 타입 정의
interface ImportMetaGlobOptions<Eager extends boolean = false> {
  eager?: Eager;
  import?: string;
  query?: string | Record<string, string | number | boolean>;
  as?: string;
  export?: string;
}
