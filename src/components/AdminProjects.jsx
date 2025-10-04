import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { getProjects, addProject, updateProject, deleteProject } from '../services/projectService';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    excerpt: '',
    description: '',
    websiteUrl: '',
    technologies: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim())
      };

      if (editingProject) {
        await updateProject({ ...projectData, id: editingProject.id });
      } else {
        await addProject(projectData);
      }

      await loadProjects();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technologies: project.technologies.join(', ')
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      thumbnail: '',
      excerpt: '',
      description: '',
      websiteUrl: '',
      technologies: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#09294c] hover:bg-[#0a3a6c]"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
              <p className="mt-2 text-gray-600">{project.excerpt}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Project Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09294c] focus:ring-[#09294c]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09294c] focus:ring-[#09294c]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Excerpt
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09294c] focus:ring-[#09294c]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09294c] focus:ring-[#09294c]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website URL
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09294c] focus:ring-[#09294c]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#09294c] focus:ring-[#09294c]"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#09294c] hover:bg-[#0a3a6c]"
                  >
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects; 