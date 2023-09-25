import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonInput,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
	useIonLoading,
	useIonRouter
} from '@ionic/react'
import React, { useState, useEffect } from 'react'
import { logInOutline, personCircleOutline } from 'ionicons/icons'
import { Preferences } from '@capacitor/preferences'

import Intro from '../components/Intro'
import FCC from '../assets/fcc.svg'

const INTRO_KEY = 'intro-seen'

const Login: React.FC = () => {
	const router = useIonRouter()
	const [introSeen, setIntroSeen] = useState(true)
	const [present, dismiss] = useIonLoading()

	useEffect(() => {
		const checkStorage = async () => {
			const seen = await Preferences.get({ key: INTRO_KEY })
			console.log(seen)
			setIntroSeen(seen.value === 'true')
		}

		checkStorage()
	}, [])

	const doLogin = async (event: any) => {
		event.preventDefault()

		await present('Logging in...')
		setTimeout(async () => {
			await dismiss()
			router.push('/app', 'root')
		}, 2000)
	}

	const finishIntro = async () => {
		console.log('FINISH')
		setIntroSeen(true)
		Preferences.set({ key: INTRO_KEY, value: 'true' })
	}

	const seeIntroAgain = () => {
		setIntroSeen(false)
		Preferences.remove({ key: INTRO_KEY })
	}

	return (
		<>
			{!introSeen ? (
				<Intro onFinish={finishIntro} />
			) : (
				<IonPage>
					<IonHeader>
						<IonToolbar color={'success'}>
							<IonTitle>Free Code Camp</IonTitle>
						</IonToolbar>
					</IonHeader>

					<IonContent scrollY={false}>
						<IonGrid
							className='ion-padding'
							fixed>
							<IonRow className='ion-justify-content-center'>
								<IonCol
									size='12'
									sizeMd='8'
									sizeLg='6'
									sizeXl='4'>
									<div className='ion-text-center ion-padding'>
										<img
											src={FCC}
											alt='FCC Logo'
											width='50%'
										/>
									</div>
								</IonCol>
							</IonRow>

							<IonRow className='ion-justify-content-center'>
								<IonCol
									size='12'
									sizeMd='8'
									sizeLg='6'
									sizeXl='4'>
									<IonCard>
										<IonCardContent>
											<form onSubmit={doLogin}>
												<IonInput
													label='Email'
													type='email'
													placeholder='email@example.com'
													labelPlacement='floating'
													fill='outline'
												/>

												<IonInput
													className='ion-margin-top'
													label='Password'
													type='password'
													labelPlacement='floating'
													fill='outline'
												/>

												<IonButton
													className='ion-margin-top'
													type='submit'
													expand='block'>
													Login
													<IonIcon icon={logInOutline} />
												</IonButton>

												<IonButton
													routerLink='/register'
													color='secondary'
													className='ion-margin-top'
													type='button'
													expand='block'>
													Create account
													<IonIcon icon={personCircleOutline} />
												</IonButton>

												<IonButton
													fill='clear'
													size='small'
													color='medium'
													className='ion-margin-top'
													type='button'
													expand='block'
													onClick={seeIntroAgain}>
													Watch intro again
													<IonIcon
														icon={personCircleOutline}
														slot='end'
													/>
												</IonButton>
											</form>
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonContent>
				</IonPage>
			)}
		</>
	)
}

export default Login
