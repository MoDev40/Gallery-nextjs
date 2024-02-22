export interface SinglePhoto {
    id: string;
    public_id: string;
    url: string;
    secure_url: string;
    createdAt: Date;
    resource_type: string;
    user_Id: string;
}
export interface ResponseType {
    photos:SinglePhoto[]
}