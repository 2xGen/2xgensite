const API_URL = '/data/projects.json';
const API_ENDPOINT = '/api/update-projects.php';

export const getProjects = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return data.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Note: These functions are for admin use only and would need a backend API to work
export const addProject = async (project) => {
  try {
    const formattedProject = {
      title: project.title,
      thumbnail: project.thumbnail,
      excerpt: project.excerpt,
      description: project.description,
      websiteUrl: project.websiteUrl,
      technologies: project.technologies.split(',').map(tech => tech.trim()),
      date: new Date().toISOString().split('T')[0]
    };

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'add',
        project: formattedProject
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add project');
    }

    return formattedProject;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const updateProject = async (project) => {
  try {
    const formattedProject = {
      id: project.id,
      title: project.title,
      thumbnail: project.thumbnail,
      excerpt: project.excerpt,
      description: project.description,
      websiteUrl: project.websiteUrl,
      technologies: project.technologies.split(',').map(tech => tech.trim()),
      date: project.date || new Date().toISOString().split('T')[0]
    };

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'update',
        project: formattedProject
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    return formattedProject;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'delete',
        projectId: projectId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }

    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}; 