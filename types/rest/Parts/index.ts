export interface CreatePartBody extends Record<string, unknown> {
  name: string;            
  type: number;
  parts: { component_part_id: string; quantity: number }[]; // Array of part IDs      
  stock_quantity: number; // Stock quantity of the assembled part  
}