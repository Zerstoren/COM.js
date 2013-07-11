var login = new (packeg('COM.GUI.Form.Text'))({
    placeholder: 'Type your name'
});

var password = new (packeg('COM.GUI.Form.Password'))({
    placeholder: 'Type your password'
});

var button = new (packeg('COM.GUI.Form.Button'))({
    value: 'Send'
});

var select = new (packeg('COM.GUI.Form.Select'))({
    data: [
        {
            value: 'test',
            text: 'test'
        },
        {
            value: 'test',
            text: 'pref'
        },
        {
            value: 'test',
            text: 'send'
        }
    ]
});

var toolbar = new (packeg('COM.GUI.Container.ToolBar'))({
    holder: 'body',
    extractClass: 'selenium boys',
    left: [login, password],
    right: [select, button]
});

toolbar.render();
