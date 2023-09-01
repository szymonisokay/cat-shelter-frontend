'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createPost } from '@/actions/posts'
import { ImageUpload } from '@/components/image-upload'
import { Map } from '@/components/map'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { PostWithUserDetails } from '@/types'

const formSchema = z.object({
	name: z.string(),
	gender: z.string(),
	age: z.number(),
	breed: z.string(),
	images: z.string().array(),
	description: z.string(),
	location: z.object({
		city: z.string(),
		latitude: z.number(),
		longitude: z.number(),
	}),
	createdAt: z.string(),
})

type FormValues = z.infer<typeof formSchema>

interface PostClientProps {
	post: PostWithUserDetails | null
	breeds?: string[]
}

export const PostClient = ({ post, breeds }: PostClientProps) => {
	console.log(post)
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: post || {
			name: post || '',
			gender: '',
			age: 0,
			breed: '',
			images: [],
			description: '',
			location: {
				city: '',
				latitude: 0,
				longitude: 0,
			},
			createdAt: new Date().toISOString(),
		},
	})

	const loading = form.formState.isLoading

	const onSubmit = async (values: FormValues) => {
		const post = await createPost(values)

		console.log(post)
	}

	return (
		<div>
			<Form {...form}>
				<form
					className='grid grid-cols-1 gap-4 sm:grid-cols-2'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className='space-y-2'>
						<p className='text-lg font-semibold tracking-tight'>
							Basic information
						</p>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder='Name' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Description'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='gender'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger
												className={cn(
													'text-muted-foreground',
													field.value &&
														'text-primary'
												)}
											>
												<SelectValue placeholder='Select gender' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem
													disabled={true}
													className='text-muted-foreground'
													value=''
												>
													Select gender
												</SelectItem>
												<SelectItem value='Male'>
													Male
												</SelectItem>
												<SelectItem value='Female'>
													Female
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='breed'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Breed</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger
												className={cn(
													'text-muted-foreground',
													field.value &&
														'text-primary'
												)}
											>
												<SelectValue placeholder='Select breed' />
											</SelectTrigger>
											<SelectContent className='max-h-[300px]'>
												<SelectItem
													disabled={true}
													className='text-muted-foreground'
													value=''
												>
													Select breed
												</SelectItem>
												{breeds?.map((breed) => (
													<SelectItem
														key={breed}
														value={breed}
													>
														{breed}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='age'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Age</FormLabel>
									<FormControl>
										<Input
											max={35}
											min={0}
											type='number'
											placeholder='Age'
											{...field}
											onChange={(event) =>
												field.onChange(
													+event.target.value
												)
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<div>
						<p className='text-lg font-semibold tracking-tight'>
							Images
						</p>

						<FormField
							control={form.control}
							name='images'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<ImageUpload
											images={field.value}
											onChange={(url) =>
												field.onChange([
													...field.value,
													url,
												])
											}
											onDelete={(url) =>
												field.onChange(
													field.value.filter(
														(image) => image !== url
													)
												)
											}
											onSetFeatured={(url) =>
												field.onChange(() => {
													const images =
														field.value.filter(
															(image) =>
																image !== url
														)

													return [url, ...images]
												})
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<div>
						<p className='text-lg font-semibold tracking-tight'>
							Location
						</p>
						<FormField
							control={form.control}
							name='location'
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<div className='my-2'>
											<Input
												value={field.value.city}
												onChange={(event) =>
													field.onChange({
														...field.value,
														city: event.target
															.value,
													})
												}
											/>

											<Map
												className='mt-2 overflow-hidden rounded-md'
												onChange={(location) =>
													field.onChange(location)
												}
											/>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<Button>
						{loading && 'loading'}
						Submit
					</Button>
				</form>
			</Form>
		</div>
	)
}
