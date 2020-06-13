import {DefaultObject} from "./defaultObject";

export class TransactionVM extends DefaultObject {
    id = null;
    amount = 0;
    type = null;

    constructor(id, amount, type) {
        super();

        this.id = id;
        this.amount = amount;
        this.type = type;
    }


    static setObject(json) {
        const task = new TransactionVM();
        task.patch(json);
        return task;
    }
}
