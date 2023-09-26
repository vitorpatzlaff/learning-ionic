import {
	IonPage,
	IonMenu,
	IonRouterOutlet,
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonItem,
	IonMenuToggle,
	IonSplitPane,
	IonIcon
} from '@ionic/react'
import React from 'react'
import { Redirect, Route } from 'react-router'
import List from './List'
import Settings from './Settings'
import { homeOutline, newspaperOutline } from 'ionicons/icons'

const Menu: React.FC = () => {
	const paths = [
		{ name: 'Home', url: '/app/list', icon: homeOutline },
		{ name: 'Settings', url: '/app/settings', icon: newspaperOutline }
	]

	return (
		<IonPage>
			<IonSplitPane contentId='main'>
				<IonMenu contentId='main'>
					<IonHeader>
						<IonToolbar color='secondary'>
							<IonTitle>Menu</IonTitle>
						</IonToolbar>
					</IonHeader>
					<IonContent>
						{paths.map((item, index) => (
							<IonMenuToggle
								key={index}
								autoHide={false}>
								<IonItem
									routerLink={item.url}
									routerDirection='none'>
									<IonIcon
										slot='start'
										icon={item.icon}
									/>
									{item.name}
								</IonItem>
							</IonMenuToggle>
						))}
					</IonContent>
				</IonMenu>

				<IonRouterOutlet id='main'>
					<Route
						exact
						path='/app/list'
						component={List}
					/>

					<Route
						path='/app/settings'
						component={Settings}
					/>

					<Route
						exact
						path='/app'>
						<Redirect to='/app/list' />
					</Route>
				</IonRouterOutlet>
			</IonSplitPane>
		</IonPage>
	)
}

export default Menu
