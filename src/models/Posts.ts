  export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    update_at: string
  }
  
  export interface PostModel {
    id: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updateAt: string
  }
  
  export interface TokenPayloadPost {
    id: string,
    creator_id: string
  }
  
  export class Post {    
      constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updateAt: string
      ) {}
  
      public getId(): string {
          return this.id
      }
      
      public setId(value: string): void {
          this.id = value
      }
  
      public getCreator(): string {
          return this.creatorId
      }
  
      public setCreator(value: string): void {
          this.creatorId = value
      }
  
      public getContent(): string {
          return this.content
      }
  
      public setContent(value: string): void {
          this.content = value
      }
  
      public getLikes(): number {
          return this.likes
      }
  
      public setLikes(value: number): void {
          this.likes = value
      }
  
      public getDislike(): number {
          return this.dislikes
      }
  
      public setDislike(value: number): void {
          this.dislikes = value
      }
      public getUpdateAt(): string {
        return this.updateAt
    }

    public setUpdateAt(value: string): void {
        this.updateAt = value
    }
  
      public getCreatedAt(): string {
          return this.createdAt
      }
  
      public setCreatedAt(value: string): void {
          this.createdAt = value
      }
  
      public toDBModel(): PostDB {
          return {
              id: this.id,
              creator_id: this.creatorId,
              content: this.content,
              likes: this.likes,
              dislikes: this.dislikes,
              update_at: this.updateAt,
              created_at: this.createdAt
          }
      }
  
      public toBusinessModel(): PostModel {
          return {
              id: this.id,
              creatorId: this.creatorId,
              content: this.content,
              likes: this.likes,
              dislikes: this.dislikes,
              updateAt: this.updateAt,
              createdAt: this.createdAt
          }
      }
  }