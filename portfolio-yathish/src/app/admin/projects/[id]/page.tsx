import React from 'react';
import { getProjectById } from '@/services/projects';
import AdminEditProjectForm from '@/components/admin/AdminEditProjectForm';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface EditProjectProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return <AdminEditProjectForm initialProject={project} id={id} />;
}
