export class DefaultObject {
    patch(data) {
        Object.keys(data).forEach((key) => {
            if (key in this) {
                this[key] = data[key];
            }
        });
    }
}
