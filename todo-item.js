"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.board = exports.createItem = void 0;
function createItem() {
    const newItem = {
        title: "Test",
        description: "Test",
        dueDate: new Date("2001-01-01"),
        priority: 3,
        notes: "More testing even than you thought.",
        checklist: ["Some item", "Next item", "Check me out"],
        //status: "unsaved" 
    };
    return newItem;
}
exports.createItem = createItem;
exports.board = [];
