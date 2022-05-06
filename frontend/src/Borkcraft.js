import React from "react"
import { useState } from 'react';
import axios from "axios"
import "./borkcraft.scss";

const Nav_Items = (props) => {


    const menu_items = [
        {   
            key: 1,
            name: "members_list"
        },
        {
            key: 2,
            name: "nether_portals"
        },
        {
            key: 3,
            name: "end_portals"
        },
        {
            key: 4,
            name: "end cities portals"
        },
        {
            key: 5,
            name: "shops"
        },
        {
            key: 6,
            name: "cool_stuff"
        },
        {
            key: 7,
            name: "message_board"
        },
        {
            key: 8,
            name: "integration"
        },
        {
            key: 9,
            name: "accounts"
        },

    ]

    const [ set_content, set_content_state ] = useState('')
    const [ popped_content, set_popped_state ] = useState('')

    const get_className_augment = (value) => {
        
        if ( props.pageState('return').isContentSet === true && set_content === value ) {
            return 'set'
        }
        else if ( props.pageState('return').isPopped === true && popped_content === value && set_content !== value) {
            return 'plus'
        }
        return 'unselected'
    }
    const get_popped_item = (e, value, over_or_out) => {

        if ( over_or_out === 'over' ) {
            set_popped_state( (before) => before = value)
            props.pageState('alter', 'poppedContentName', value)
        }
        else if ( over_or_out === 'out' ) {
            set_popped_state( (before) => before = 'unselected')
            props.pageState('alter', 'poppedContentName', 'unselected')
        }
        props.handlePop(e)
    }
    const get_set_item = (e, value) => {
        set_popped_state( (before) => before = value)
        
        if ( props.pageState('return').isContentSet === true && set_content === value ) { // if the previously clicked item is clicked again
            set_content_state( (before) => before = "default")
            props.pageState('alter', 'setContentName', "default")
            props.handleSetContent(e)
        }
        else if ( props.pageState('return').isContentSet === true && set_content !== value) { // if there was an item already clicked and the user clicks a new one
            set_content_state( (before) => before = value)
            props.pageState('alter', 'setContentName', value)
            //props.handleSetContent(e)
            
        }
        else {                                 
            set_content_state( (before) => before = value)                                              // if there is no item currently clicked
            props.pageState('alter', 'setContentName', value)
            props.handleSetContent(e)
        }
    }


    return (
        <div className='fakeul'>
            {
                menu_items.map(item =>  {
                    return <a   className={`${item.name} ${get_className_augment(item.name)}`}
                                onMouseOver={(e) => get_popped_item(e, item.name, 'over')}
                                onMouseOut={(e) => get_popped_item(e, item.name, 'out')}
                                onClick={(e) => get_set_item(e, item.name)}
                                key={item.key}
                            >{item.name}
                            </a>
                })
            }
        </div>
    )
}

//const getData = () => {
    
    // function format_netherPortals(obj) {

    //     function if_in(checkMe, array) {
    //         var i;
    //         for (i=0; i<array.length; i++) {
    //             if (checkMe === array[i]) {
    //                 return true
    //             }
    //         }
    //         return false
    //     }

    //     let full_string;
    //     let partial_string;
    //     let past_members = [""];
    //     let i;
    //     let j;
    //     for (i=0; i<obj.length; i++) {
    //         let i2 = i.toString()

    //         let current_member = obj[i2]["member"]
    //         partial_string = `<> member: ${current_member}` + "\n" +
    //         `locale: (${obj[i2]["locale"]}) | co-ordinates: xyz(${obj[i2]["x"]}, ${obj[i2]["y"]}, ${obj[i2]["z"]} | realm: ${obj[i2]["realm"]})` + "\n"

    //         for (j=0; j<obj.length;) {
    //             let j2 = j.toString()
    //             if (obj[j2]["member"] == current_member && !if_in(current_member, past_members)) {
    //                 partial_string = partial_string + `locale: (${obj[j2]["locale"]}) | co-ordinates: xyz(${obj[j2]["x"]}, ${obj[j2]["y"]}, ${obj[j2]["z"]} | realm: ${obj[j2]["realm"]})` + "\n"
    //             }
    //         }
    //         past_members.push(current_member)
    //         partial_string = ""


    //         if (full_string != "") {
    //             full_string = full_string + partial_string + "\n"
    //         } else {
    //             full_string = partial_string
    //         }
    //     }

    //     return full_string
    // }
    

    //axios.get('http://localhost:8001/' + current_item.replace("_", "")).then(response => {
    //axios.get('http://localhost:8001/netherportals').then(response => {
        // console.log(response, response["data"]["0"]["local"]);
        //content = JSON.stringify(response["data"]);
        // content = format_netherPortals(JSON.stringify(response["data"]))
 //   })
//} 
// var content = ""
function getData() {

    function format_netherPortals(obj) {

        function if_in(checkMe, array) {
            var t;
            for (t=0; t<array.length; t++) {
                if (checkMe === array[t]) {
                    return true
                }
            }
            return false
        }

        let full_string = "";
        let partial_string = "";
        let past_members = [""];
        var i;
        let j;


        for (i=0; i<Object.keys(obj).length; i++) {
            let i2 = i.toString()
            let current_member = obj[i2]["member"]

            for (j=0; j<Object.keys(obj).length; j++) {
                let j2 = j.toString()
                if (obj[j2]["member"] === current_member && !if_in(current_member, past_members)) {
                    partial_string = partial_string + `locale: (${obj[j2]["local"]}) | co-ordinates: xyz(${obj[j2]["x"]}, ${obj[j2]["y"]}, ${obj[j2]["z"]} | realm: ${obj[j2]["realm"]})` + "\n"
                }
		    
            }
            past_members.push(current_member)

            if (full_string != "") {
                full_string = full_string + partial_string + "\n"
            } else {
                full_string = partial_string
            }

            partial_string = ""
        }
	
        return full_string
    }

    

    axios.get('http://localhost:8001/netherportals').then(response => {
        content = format_netherPortals(response["data"])
    })

}


let content = ""
const Content_Items = (props) => {
    let current_item = 'unselected'
    //getData()

    const popped_or_set = () => {

        if (props.pageState('return').isPopped === true && props.pageState('return').setContentName !== props.pageState('return').poppedContentName) {
            current_item = props.pageState('return').poppedContentName
            return 'plus'
        }
        else if (props.pageState('return').isContentSet === true) {
            current_item = props.pageState('return').setContentName
            return 'set'
        }
        else {
            return ''
        }
    }

    var something = popped_or_set()
    var blast = "nothin"
    if (current_item === "nether_portals") {
        blast = content
    }
    else {
        //"NON-FOCUS-DATA"
        blast = current_item
    }

    return (
        <div className={`content_items`}>
            {console.log(current_item)}
            <div className='title'>{`${current_item}`}</div>
            <br/>
            <div className={`content_items ${something}1`}>{blast}</div>
        </div>
    )

}



/*                  main's children components                            */
const NavBar = (props) => {
    return (
        <nav>
            <Nav_Items handlePop={props.handlePop} pageState={props.pageState} handleSetContent={props.handleSetContent} switch={props.switch}/>
        </nav>
    );
};


const Content = (props) => {
    
    return (
        <div className='content'>
            <Content_Items handlePop={props.handlePop} pageState={props.pageState} switch={props.switch}/>
        </div>
    );
};

const Header = () => {
    return (
        <header>Header</header>
    )
}


class Borkcraft extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isPopped: false,
            isContentSet: false,
            poppedContentName: 'default_setContentName',
            setContentName: 'default_setContentName',
            switch: false,
            
        }
        this.handlePop = this.handlePop.bind(this)
        this.handleSetContent = this.handleSetContent.bind(this)
        this.pageState = this.pageState.bind(this)
        this.switch = this.switch.bind(this)
    }
    
    handlePop(e) {
        e.preventDefault();
        this.setState({
            isPopped: !this.state.isPopped
        })
    }
    handleSetContent(e) {
        e.preventDefault();
        alert('Clicky!')
        this.setState({
            isContentSet: !this.state.isContentSet
        })
    }
    pageState(value, state_variable = 0, value_to_assign = 0) {
        if (value.toLowerCase() === 'alter') {
            if (state_variable === 'poppedContentName') {
                this.setState({
                    poppedContentName: value_to_assign
                })
            }
            else if(state_variable === 'setContentName') {
                this.setState({
                    setContentName: value_to_assign
                })
            }
        }
        else if (value.toLowerCase() === 'return') {
            return this.state
        }
    }

    switch() {
        this.setState({
            // ignore this function. It is for testing purposes.
            switch: !this.state.switch
        })
    }


    render() {
        return (
            <div className='page'>
                <Header />
                <NavBar handlePop={this.handlePop} pageState={this.pageState} handleSetContent={this.handleSetContent} switch={this.switch}/>
                <Content handlePop={this.handlePop} pageState={this.pageState} switch={this.switch}/>
            </div>
        );
        
    }
};

export default Borkcraft