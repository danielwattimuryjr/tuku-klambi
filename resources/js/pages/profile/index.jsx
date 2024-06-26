import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { formatDate } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

export default function Index({ genders, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        nama_lengkap: user.name,
        username: user.username,
        email: user.email,
        tanggal_lahir: user.tanggal_lahir,
        no_telp: user.no_telp,
        jenis_kelamin: user.jenis_kelamin,
        alamat: user.alamat,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            onSuccess: () => {
                toast({
                    title: 'Yeay!! your profile has been updated successfully. 🎉',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh... Failed while trying to update your profile. 😥',
                    description: getTimeStamp(),
                });
            },
        });
    };
    return (
        <Container className={'lg:max-w-2xl'}>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account's profile information and email address.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className='space-y-6'>
                        <div>
                            <Label htmlFor='username'>Username</Label>

                            <Input id='username' className='mt-1 block w-full' value={data.username} onChange={(e) => setData('username', e.target.value)} required autoComplete='username' />

                            <InputError className='mt-2' message={errors.username} />
                        </div>

                        <div>
                            <Label htmlFor='email'>Email</Label>

                            <Input id='email' type='email' className='mt-1 block w-full' value={data.email} onChange={(e) => setData('email', e.target.value)} required autoComplete='username' />

                            <InputError className='mt-2' message={errors.email} />
                        </div>

                        <div>
                            <Label htmlFor='name'>Nama Lengkap</Label>

                            <Input id='name' className='mt-1 block w-full' value={data.nama_lengkap} onChange={(e) => setData('nama_lengkap', e.target.value)} required autoFocus autoComplete='name' />

                            <InputError className='mt-2' message={errors.nama_lengkap} />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='nama_lengkap'>Tanggal Lahir</Label>

                            <DatePicker placeholder={'Pilih tanggal lahir'} selected={data.tanggal_lahir} onSelect={(e) => setData('tanggal_lahir', formatDate(e))} />

                            <InputError message={errors.tanggal_lahir} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='no_telp'>Nomor Telepon</Label>

                            <Input id='no_telp' type='tel' name='no_telp' value={data.no_telp} className='mt-1 block w-full' autoComplete='no_telp' onChange={(e) => setData('no_telp', e.target.value)} />

                            <InputError message={errors.no_telp} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='gender'>Jenis Kelamin</Label>

                            <div className='mt-1 block w-full'>
                                <Select id='gender' onValueChange={(value) => setData('jenis_kelamin', value)} defaultValue={data.jenis_kelamin}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Pilih Jenis Kelamin' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {genders.map((gender) => (
                                                <SelectItem value={gender.value} key={gender.value}>
                                                    {gender.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <InputError message={errors.no_telp} className='mt-2' />
                        </div>

                        <div className='flex items-center gap-4'>
                            <Button disabled={processing}>Save</Button>

                            <Transition show={recentlySuccessful} enter='transition ease-in-out' enterFrom='opacity-0' leave='transition ease-in-out' leaveTo='opacity-0'>
                                <p className='text-sm text-muted-foreground'>Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

Index.layout = (page) => <AuthLayout title={'Profile'} children={page} />;
