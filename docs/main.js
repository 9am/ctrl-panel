const onUpdate = (evt) => {
    const target = evt.target;
    const value = target.value;
    const pre = target.nextElementSibling.querySelector('pre');
    pre.textContent = JSON.stringify(value, null, 2);
};
document.body.addEventListener('CHANGE', onUpdate);
