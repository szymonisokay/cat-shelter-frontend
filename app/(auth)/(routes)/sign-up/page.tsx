'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../../../../components/ui/button'
import authService from '../../../../services/auth.service'

const formSchema = z.object({
	email: z.string(),
	username: z.string(),
	password: z.string().min(8),
})

type FormValues = z.infer<typeof formSchema>

const SignUpPage = () => {
	const router = useRouter()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
		},
	})

	const onSubmit = async (values: FormValues) => {
		try {
			await authService.signUp(values)

			router.push('/sign-in')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<p className='mb-10 text-lg font-bold leading-none tracking-tight text-center'>
				<Link prefetch={false} href='/'>
					LOGO
				</Link>
			</p>

			<Card className='w-[300px] p-4'>
				<CardTitle className='text-lg'>Sign Up</CardTitle>
				<CardDescription className='text-sm'>
					Continue to adopt a cat
				</CardDescription>

				<Form {...form}>
					<form
						className='mt-4 space-y-2'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='username'>
										Username
									</FormLabel>
									<FormControl>
										<Input
											id='username'
											placeholder='Enter username'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='email'>Email</FormLabel>
									<FormControl>
										<Input
											id='email'
											placeholder='Enter email'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='password'>
										Password
									</FormLabel>
									<FormControl>
										<Input
											id='password'
											type='password'
											placeholder='Enter password'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<div>
							<Button className='w-full mt-2 duration-150 bg-blue-700 hover:bg-blue-700/90'>
								Sign Up
							</Button>
						</div>

						<p className='pt-2 text-sm text-center text-muted-foreground'>
							Already have an account?{' '}
							<Link
								prefetch={false}
								className='text-blue-700 hover:underline'
								href='/sign-in'
							>
								Sign In
							</Link>
						</p>
					</form>
				</Form>
			</Card>
		</div>
	)
}

export default SignUpPage
