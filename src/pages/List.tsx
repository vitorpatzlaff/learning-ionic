import {
	IonAvatar,
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
	IonCardTitle,
	IonChip,
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonItem,
	IonLabel,
	IonMenuButton,
	IonModal,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonSearchbar,
	IonSkeletonText,
	IonTitle,
	IonToolbar,
	useIonAlert,
	useIonToast,
	useIonViewWillEnter
} from '@ionic/react'
import { trashBinOutline } from 'ionicons/icons'
import React, { useRef, useState } from 'react'

const List: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true)
	const [users, setUsers] = useState<any[]>([])
	const [showAlert] = useIonAlert()
	const [showToast] = useIonToast()
	const [selectedUser, setSelectedUser] = useState<any>(null)
	const modal = useRef<HTMLIonModalElement>(null)

	useIonViewWillEnter(async () => {
		const users = await getUsers()
		console.log('users', users)
		setUsers(users)
		setLoading(false)
	})

	const getUsers = async () => {
		const data = await fetch('https://randomuser.me/api?results=10')
		const users = await data.json()
		return users.results
	}

	const clearList = () => {
		showAlert({
			header: 'Confirm!',
			message: 'Are you sure you want to delete all users?',
			buttons: [
				{ text: 'Cancel', role: 'cancel' },
				{
					text: 'Delete',
					handler: () => {
						setUsers([])
						showToast({
							message: 'All users deleted',
							duration: 2000,
							color: 'danger'
						})
					}
				}
			]
		})
	}

	const doRefresh = async (event: any) => {
		setLoading(true)
		const data = await getUsers()
		setUsers(data)
		setLoading(false)
		event.detail.complete()
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color='success'>
					<IonButtons slot='start'>
						<IonMenuButton />
					</IonButtons>

					<IonTitle>List</IonTitle>

					<IonButtons slot='end'>
						<IonButton onClick={clearList}>
							<IonIcon
								slot='icon-only'
								icon={trashBinOutline}
								color='light'
							/>
						</IonButton>
					</IonButtons>
				</IonToolbar>

				<IonToolbar color='success'>
					<IonSearchbar />
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<IonRefresher
					slot='fixed'
					onIonRefresh={doRefresh}>
					<IonRefresherContent />
				</IonRefresher>

				{loading &&
					[...Array(10)].map((_, index) => (
						<IonCard key={index}>
							<IonCardContent className='ion-no-padding'>
								<IonItem lines='none'>
									<IonAvatar slot='start'>
										<IonSkeletonText />
									</IonAvatar>

									<IonLabel>
										<IonSkeletonText
											animated
											style={{ width: '120px' }}
										/>

										<p>
											<IonSkeletonText
												animated
												style={{ width: '200px' }}
											/>
										</p>
									</IonLabel>

									{/* <IonChip
										slot='end'
										color='primary'>
									</IonChip> */}

									<IonSkeletonText
										slot='end'
										animated
										style={{
											width: '35px',
											height: '25px',
											borderRadius: '20px'
										}}
									/>
								</IonItem>
							</IonCardContent>
						</IonCard>
					))}

				{users.map((user, index) => (
					<IonCard
						key={index}
						onClick={() => setSelectedUser(user)}>
						<IonCardContent className='ion-no-padding'>
							<IonItem lines='none'>
								<IonAvatar slot='start'>
									<IonImg src={user.picture.thumbnail} />
								</IonAvatar>

								<IonLabel>
									{user.name.first} {user.name.last}
									<p>{user.email}</p>
								</IonLabel>

								<IonChip
									slot='end'
									color='primary'>
									{user.nat}
								</IonChip>
							</IonItem>
						</IonCardContent>
					</IonCard>
				))}

				<IonModal
					ref={modal}
					isOpen={selectedUser !== null}
					onIonModalDidDismiss={() => setSelectedUser(null)}>
					<IonHeader>
						<IonToolbar color='success'>
							<IonButtons slot='start'>
								<IonButton onClick={() => modal.current?.dismiss()}>
									Close
								</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>

					<IonContent>SHEET</IonContent>
				</IonModal>
			</IonContent>
		</IonPage>
	)
}

export default List
