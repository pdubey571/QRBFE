import {CustomizationList} from './customization'
    export interface CategoryData {
        id: number;
        category_name: string;
        category_description: string;
        parent_category: number;
        status: number;
        create_ts: Date;
        update_ts: Date;
    }

    export interface CategoryResponse {
        status: boolean;
        data: CategoryData[];
    }  
    
    export interface Category {
        id: string;
        category_name: string;
        resturant_id: string;
        parent_category:string;
        category_description:string;
        status:string;
    }
    export interface EditCategory {
        id: string;
        category_name: string;        
    }
    export interface addCategory {
        status:string;
        category_name: string;  
        category_description:string;
        parent_category:string; 
    }
    export interface GenericDelete{
        id:string;
        type:string;
    }

    export interface MenuForm {
        name: string
        restaurant_id: string
        category: string
        item_description: string
        status: string
        price: string
        customization: CustomizationList[]
      }
