/*var login = new (package('COM.GUI.Form.Text'))({
    placeholder: 'Type your name'
});

var password = new (package('COM.GUI.Form.Password'))({
    placeholder: 'Type your password'
});

var button = new (package('COM.GUI.Form.Button'))({
    value: 'Send'
});

var select = new (package('COM.GUI.Form.Select'))({
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

var radiogroup = new (package('COM.GUI.Form.RadioGroup'))({
    data: [
        {
            value: 'test',
            text: 'test'
        },
        {
            value: 'test2',
            text: 'test2'
        },
        {
            value: 'test3',
            text: 'test3',
            checked: true
        }
    ]
});

var checkboxgroup = new (package('COM.GUI.From.CheckboxGroup'))({
    data: [
        {
            value: 'test',
            text: 'test'
        },
        {
            value: 'test2',
            text: 'test2'
        },
        {
            value: 'test3',
            text: 'test3',
            checked: true
        }
    ]
});

var toolbar = new (package('COM.GUI.Container.ToolBar'))({
    holder: 'body',
    left: [login, password, checkboxgroup],
    right: [select, button, radiogroup]
});

toolbar.render();
*/

var Grid = package('COM.GUI.Grid');

var rows = [];

var hRow = new Grid.Row({
    cells: ['Header Cell 1', 'Header Cell 2', 'Header Cell 3']
});

var fRow = new Grid.Row({
    cells: ['Footer Cell 1', 'Footer Cell 2', 'Footer Cell 3']
})

for(var i = 10; i--;) {
    var row = new (package('COM.GUI.Grid.Row'))({
        cells: ['Cell 1', 'Cell 2', 'Cell 3']
    });

    rows.push(row);
}

var grid = new Grid.Grid({
    holder: 'body',
    caption: 'Yes',
    rows: rows,
    header: hRow,
    footer: fRow
});

grid.render();
