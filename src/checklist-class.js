

export default class ChecklistItem {
    constructor(itemTitle, isDone = false) {
        this._itemTitle = itemTitle;
        this._isDone = isDone;
    }

    getItemTitle() {
        return this._itemTitle;
    }
    
    setItemTitle(itemTitle) {
        this._itemTitle = itemTitle;
    }

    setIsDone(status) {
        this._isDone = status;
    }

    getIsDone() {
        return this._isDone;
    }
}