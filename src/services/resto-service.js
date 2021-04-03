export default class RestoService {
    _apiBase = 'http://127.0.0.1:3000';

    async getResource(url) {
        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok){
            throw new Error(`could not fetch ${url}` +
            `, received ${response.status}`);
        }
        return await response.json();
    }

    async getMenuItems() {
        return await this.getResource(`/menu/`);
    }

    async getItem(id) {
        const res = await this.getResource('/menu/');
        const item = res.find ((el) => {
            console.log(`el.id: ${el.id}, id: ${id}`);
            return el.id === +id;
        })
        return item;
    }

    async setOrder(order) {
        const number = await this.getOrderNumber();
        const newOrder = {
            id: number,
            order
        }
        const response = await fetch(`${this._apiBase}/orders`, {
            method: 'POST',
            headers: {
                'Contetn-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newOrder)
        });
        if (!response.ok) {
            throw new Error ('json error');
        }
    }

    async getOrderNumber() {
        const res = await this.getResource('/orders/');
        const orderNumber = res.length + 1;

        return orderNumber
    }
}
