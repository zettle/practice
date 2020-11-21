interface Ipopup {
    width?: string;
    height?: string;
    title?: string;
    pos?: string;
    mask?: boolean;
    content?: () => void;
}

interface Icomponent {
    tempContainer: HTMLDivElement;
    init: () => void;
    template: () => void;
    handle: () => void;
}

function popup (options: Ipopup) {
    return new Popup(options);
}

class Popup implements Icomponent {
    tempContainer: HTMLDivElement = document.createElement('div');
    constructor (private settings: Ipopup) {
        this.settings = Object.assign({
            width: '100%',
            height: '100%',
            title: '',
            pos: 'center',
            mask: true,
            content: () => {}
        }, this.settings);
        this.init();
    }
    init () {
        this.template();
    }
    template () {
        this.tempContainer = document.createElement('div');
        this.tempContainer.innerHTML = `
            <h1>Hello</h1>
        `;
        document.body.appendChild(this.tempContainer);
    }
    handle () {}
}

export default popup;