export type CreateMemeRequest = {
  image: File;
  title: string;
  description?: string;
  tags?: string[];
};
