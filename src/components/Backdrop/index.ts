const warn = () => console.warn("Backdrop isn't registered yet.")

let backdrop = {
    show: warn,
    hide: warn,
};

export const registerBackdrop = (ref:any) => {
    if (ref) {
        backdrop.show = ref.show;
        backdrop.hide = ref.hide;
    } else {
        backdrop.show = warn;
        backdrop.hide = warn;
    }
}

export { default as BackdropInstance } from "./Backdrop";

export default backdrop;