import { useState, useEffect } from 'react';

const MemberList = () => {    
    const [ whitelist, setWhitelist ] = useState({})
    const [ isWhiteListSet, setIsWhiteListSet ] = useState(false)
    const [ onHoverMember, setOnHoverMember ] = useState('')
    const [ onClickMembers, setOnClickMembers ] = useState([])
 
    useEffect(() => {
        Whitelist()
    }, [])
    const Whitelist = () => {
        fetch(
            'http://localhost:8080/whitelist',
            {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        ).then((response) => {
            response.json().then(
                (data) => {
                    setWhitelist(data.Whitelist)
                    setIsWhiteListSet(true)
                }
            )
            })
    }   

    const handleHover = (name) => {
            setOnHoverMember(name)
    }
    const handleHoverOut = () => {
            setOnHoverMember('')
    }
    const handleClick = (name) => {
        if (onClickMembers.includes(name)) {
            setOnClickMembers((onClickMembers) => {
                for (var i=0;i<onClickMembers.length;i++) {
                    if (onClickMembers[i] === name) {
                        onClickMembers.splice(i, 1)
                        console.log(onClickMembers)
                        break
                    }
                }
                return [...onClickMembers]
            })
        } else {
            setOnClickMembers(onClickMembers => [...onClickMembers, name])
        }
    } 

    const setCss = (name) => {
        if (name === onHoverMember && !onClickMembers.includes(name)) {
            return 'not-hidden' // reveals the information
        } else if (onClickMembers.includes(name)){
            return 'not-hidden'

        } else {
            return 'hidden' // hides the information
        }
    }

    if (isWhiteListSet) {
        return (
            <div className='col offset-right'>
                <div className='row'>
                <header className='col section-headerx px-sm-2 px-0 bg-dark text-white text-center'>|Member|</header>
                <header className='col section-headerx px-sm-2 px-0 bg-dark text-white text-center'>|Server|</header>
                </div>                                
            {
                whitelist.map(item => {
                    return <div className='junkie'>

                    <header className='section-header mt-5 text-center' key={item.Id}
                    onMouseOver={() => handleHover(item.Member)}
                    onMouseOut={() => handleHoverOut()}
                    onClick={() => handleClick(item.Member)}
                    >

                    <p key={item.Id}>{item.Member}&emsp;{item.Servers}<br></br></p>
                    </header>
                    <div className={`${setCss(item.Member)}`}
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> 

                    </div>
                })
            }
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default MemberList
