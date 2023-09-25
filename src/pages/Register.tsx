import {
	IonBackButton,
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonRouter
} from '@ionic/react'
import { checkmarkDone } from 'ionicons/icons'
import React, { useState } from 'react'

const Register: React.FC = () => {
	const router = useIonRouter()

	const doRegister = (event: any) => {
		event.preventDefault()
		console.log('doRegister')
		// router.push('/home', 'root')
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color={'success'}>
					<IonButtons slot='start'>
						<IonBackButton defaultHref='/' />
					</IonButtons>
					<IonTitle>Create Account</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent scrollY={false}>
				<IonCard>
					<IonCardContent>
						<form onSubmit={doRegister}>
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
								Create my account
								<IonIcon icon={checkmarkDone} />
							</IonButton>
						</form>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	)
}

export default Register
