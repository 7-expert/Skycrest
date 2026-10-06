import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';

async function createProjectAction(formData) {
  'use server';
  await requireAdmin();

  const title = formData.get('title')?.toString().trim();
  const category = formData.get('category')?.toString().trim();
  const status = formData.get('status')?.toString().trim();
  const location = formData.get('location')?.toString().trim();
  const completion_date = formData.get('completion_date')?.toString().trim();
  const scope = formData.get('scope')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const sort_order = parseInt(formData.get('sort_order')?.toString() || '0', 10);
  const is_published = formData.get('is_published') === 'on';

  const imageFile = formData.get('imageFile');

  let image_url = '/project images/c1.webp';

  const supabase = await createClient();

  if (imageFile && typeof imageFile === 'object' && imageFile.name && imageFile.size > 0) {
    const ext = imageFile.name.split('.').pop() || 'webp';
    const filename = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filename, imageFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(filename);

    image_url = publicUrlData.publicUrl;
  }

  const { error: insertError } = await supabase.from('projects').insert([
    {
      title,
      category,
      status,
      location,
      completion_date,
      scope,
      description,
      image_url,
      sort_order,
      is_published,
    },
  ]);

  if (insertError) {
    throw new Error(`Failed to create project record: ${insertError.message}`);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <ProjectForm
      title="CREATE NEW PROJECT"
      action={createProjectAction}
    />
  );
}
