class Select {
    elementName;
    element;
    options;
    parent;
    itemList = [];
    constructor(elementName) {
        this.elementName = elementName;
        this.facade();
    } 
    facade() {
        this.detectItems();
        this.listItems();
        this.elementHide();
    }
    detectItems() {
        this.element = document.querySelector(this.elementName);
        this.options = this.element.querySelectorAll('option');
        this.parent = this.element.parentElement;
    }
    elementHide() {
        this.element.style.display = 'none';
    }
    listItems() {
        this.options.forEach(element => {
            this.itemList.push({value:element.value, text: element.innerText, selected: element.selected})
        });
    }
}

class VisualList{
    select;
    element;
    className = 'multiple-select-box';
    constructor(selectObject) {
        this.select = selectObject;
        this.facade();
    }
    facade() {
        this.createListItems();
    }
    createListItems() {
        const ul = document.createElement('ul');
        ul.setAttribute('data-id', this.select.elementName);
        ul.setAttribute('class', this.className);
        
        this.select.itemList.forEach(element => {
            const li = document.createElement('li')
            li.setAttribute('data-selected', element.selected);
            li.setAttribute('data-value', element.value);
            const node = document.createTextNode(element.text);
            li.appendChild(node);
            ul.appendChild(li);
        });
        this.select.parent.appendChild(ul);
        this.element = ul;
    }

}

class MultipleSelect {
    select;
    visualList;
    constructor(element) {
        this.select = new Select(element);
        this.visualList = new VisualList(this.select);
    }
    toString() {
        console.log('I am Multiple Select !');
    }
} 

