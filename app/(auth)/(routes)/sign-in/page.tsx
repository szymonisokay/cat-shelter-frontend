'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { getUser, getUserDetails } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import authService from '@/services/auth.service'

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

type FormValues = z.infer<typeof formSchema>

const SignInPage = () => {
	const router = useRouter()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		await authService.signIn(values)
		const user = await getUser()

		if (!user) return

		const details = await getUserDetails(user.userId)

		console.log(details)

		if (!details?.firstName || !details.lastName || !details.mobile) {
			router.push('/confirm-account')
		} else {
			router.push('/')
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
				<CardTitle className='text-lg'>Sign In</CardTitle>
				<CardDescription className='text-sm'>Continue to adopt a cat</CardDescription>

				<Form {...form}>
					<form className='mt-4 space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='email'>Email</FormLabel>
									<FormControl>
										<Input id='email' placeholder='Enter email' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='password'>Password</FormLabel>
									<FormControl>
										<Input id='password' type='password' placeholder='Enter password' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<div>
							<Button
								disabled={loading}
								className='w-full gap-2 mt-2 duration-150 bg-blue-700 hover:bg-blue-700/90 disabled:opacity-50'
							>
								{loading && <Loader2Icon className='w-4 h-4 animate-spin' />}
								Sign In
							</Button>
						</div>

						<p className='pt-2 text-sm text-center text-muted-foreground'>
							Don't have an account?{' '}
							<Link prefetch={false} className='text-blue-700 hover:underline' href='/sign-up'>
								Sign up
							</Link>
						</p>
					</form>
				</Form>
			</Card>
		</div>
	)
}

export default SignInPage
