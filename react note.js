function App(){
    return React.createElement('div', null, {
        React.createElement('button', null, 'click'),
        React.createElement('button', null, 'click'),
        React.createElement('p', null, '0'),

    });
}
ReactDOM.render(React.createElement(App), document.querySelector("#main"));





function App(){
    return(
        <div>
            <button>Click</button>
            <button>Click</button>
            <p>0</p>
        </div>
    );
}
ReactDOM.render(</App>, document.querySelector("#main"));