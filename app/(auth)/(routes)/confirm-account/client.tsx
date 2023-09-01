'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { User } from '@/types'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { updateUserDetails } from '../../../../actions/user'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'

type Props = {
	user: User
}

const formSchema = z.object({
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	mobile: z.string().nonempty(),
})

type FormValues = z.infer<typeof formSchema>

export const Client = ({ user }: Props) => {
	const router = useRouter()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			mobile: '',
		},
	})

	const loading = form.formState.isSubmitting

	const onSubmit = async (values: FormValues) => {
		const data = await updateUserDetails(values)

		if (data) {
			toast.success('Details updated')
			router.push('/')
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-lg'>
					Fill in account details
				</CardTitle>
				<CardDescription className='text-sm'>
					You won't be able to fully use our app
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className='flex flex-col gap-2'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						{/* <FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<>
											<Input {...field} />
										</>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input disabled={true} {...field} />
									</FormControl>
								</FormItem>
							)}
						/> */}

						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='mobile'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone number</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<Button disabled={loading} className='mt-2'>
							Continue
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
