import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect, notFound } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';

async function updateProjectAction(formData) {
  'use server';
  await requireAdmin();

  const id = formData.get('id')?.toString();
  const current_image_url = formData.get('current_image_url')?.toString();
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

  let image_url = current_image_url || '';

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

    // Remove old storage file if replacing an existing uploaded image
    if (current_image_url && current_image_url.includes('supabase.co/storage/v1/object/public/project-images/')) {
      const oldFilename = current_image_url.split('project-images/').pop();
      if (oldFilename) {
        await supabase.storage.from('project-images').remove([oldFilename]);
      }
    }
  }

  const { error: updateError } = await supabase
    .from('projects')
    .update({
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
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (updateError) {
    throw new Error(`Failed to update project record: ${updateError.message}`);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export default async function EditProjectPage({ params }) {
  await requireAdmin();
  const { id } = await params;

  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <ProjectForm
      title={`EDIT: ${project.title}`}
      project={project}
      action={updateProjectAction}
    />
  );
}
