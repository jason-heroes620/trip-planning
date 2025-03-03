export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PaginatedData<T> = {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };

    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;

        links: {
            url: null | string;
            label: string;
            active: boolean;
        }[];
    };
};

export interface Product {
    merchant_id: string;
    product_name: string;
    product_description: string;
    product_activities: string;
    product_images: Blob;
    age_group: string;
    location: string;
    student_price: number;
    teacher_price: number;
    duration: string;
    category_id: string;
    id: string;
    min_quantity: number;
    max_quantity: number;
    food_allowed: number;
}

export interface Proposal {
    proposal_id: string;
    proposal_name: string;
    proposal_date: Date;
    quotation_id: string;
    additional_price: number;
    qty_student: number;
    qty_teacher: number;
    travel_distance: number;
    travel_duration: number;
    proposal_status: number;
}

export interface ProposalProduct {
    proposal_product_id: string;
    proposal_id: string;
    product_id: string;
    uom: string;
    unit_price: number;
    product_qty: number;
    sales_tax: number;
}

export interface ProposalItem {
    proposal_item_id: string;
    item_id: string;
    item_name: string;
    uom: string;
    item_qty: number;
    unit_price: string;
    sales_tax: number;
    item_type: string;
    additional_unit_cost: string;
    additional: string;
}

export interface Quotation {
    quotation_id: string;
    quotation_no: string;
    quotation_date: string;
    quotation_amount: number;
    quotation_status: number;
    school_name: string;
}

export interface Fees {
    fee_id: number;
    fee_description: string;
    fee_amount: string;
    fee_type: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        message: {
            success: boolean;
        };
    };
};
