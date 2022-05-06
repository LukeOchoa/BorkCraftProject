import React from "react"
import { useState, useEffect } from 'react';

const Home = () => {
	const [ data, setData ] = useState('no profile')

	useEffect(() => {
		fetch(
			"http://localhost:8080/",{
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		).then((response) => {
			response.json()
				.then((data) => {
					var stringy = ""
					for (var key in data) {
						stringy = stringy + data[key]
					}
					setData(stringy)
				}
			)
		})
	}, [])

	const logout = async (e) => {
		e.preventDefault()
		fetch(
			"http://localhost:8080/logout", {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		).then((response) => {
			response.json()
				.then((exa) => {
					let str = exa.message
					setData('no profile')
					alert(str)
				})
		})
	}

    return (
		<div className='indexy'>
			<h2>/Welcome to the HOMEPAGE\</h2>
			<div>{data}</div>
			<button onClick={(e) => {logout(e)}}>Logout</button>
		</div>

    )
}

export default Home



