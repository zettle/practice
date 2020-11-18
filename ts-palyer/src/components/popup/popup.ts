interface Ipopup {
    width?: string;
    height?: string;
    title?: string;
    pos?: string;
    mask?: boolean;
    content?: () => void;
}

function popup (options: Ipopup) {
    return new Popup(options);
}

class Popup {
    constructor (private settings: Ipopup) {
        this.settings = Object.assign({
            width: '100%',
            height: '100%',
            title: '',
            pos: 'center',
            mask: true,
            content: () => {}
        }, this.settings);
    }
}

export default popup;