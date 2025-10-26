export type CreateMemeRequest = {
  image: File | null;
  title: string;
  description?: string;
  Tags?: string[];
};
