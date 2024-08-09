export interface TagType {
  id: number;
  name: string;
  color: string;
  createdAt: string;
  icon: string;
}

export interface PaginateType{
  page: number;
  pageSize: number;
  total?: number;
}

export interface EditStateType {
  type: 'edit' | 'new',
  data: {
    id: number,
    content: never,
    titleZH: string,
    titleEN: string,
    tags: { name: string, color: string, id: number }[],
    cover: string,
    isMarkdown: boolean,
    createdAt: string,
  }
}
