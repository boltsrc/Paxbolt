import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ProjectModal } from "./ProjectModal";
import { type Project } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaGithub, 
  FaExternalLinkAlt, 
  FaDownload,
  FaCode,
  FaCalendar
} from "react-icons/fa";

export function ProjectsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["/api/projects"],
    queryFn: () => fetch("/api/projects").then(res => res.json()) as Promise<Project[]>,
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/projects/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to delete project", variant: "destructive" });
    },
  });

  const handleCreateProject = () => {
    setEditProject(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditProject(project);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      deleteProjectMutation.mutate(project.id);
    }
  };

  const handleDownload = (downloadUrl: string, title: string) => {
    window.open(downloadUrl, '_blank');
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Failed to load projects. Please try again.</p>
      </div>
    );
  }

  return (
    <section id="projects" className="py-20 lg:py-32 bg-custom-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-custom-accent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-custom-accent mx-auto mb-8"></div>
          <p className="text-xl text-custom-text-secondary max-w-3xl mx-auto mb-8">
            Explore my latest projects showcasing expertise in Python and Java development, 
            from robust APIs to full-stack applications.
          </p>
          
          <Button
            onClick={handleCreateProject}
            className="bg-gradient-to-r from-custom-accent to-custom-accent-hover px-8 py-3 rounded-full text-custom-primary font-semibold hover:shadow-custom-accent/30 transition-all duration-300"
          >
            <FaPlus className="mr-2" />
            Add New Project
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-custom-secondary/30 rounded-2xl p-8 animate-pulse">
                <div className="h-6 bg-custom-accent/20 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-custom-accent/20 rounded w-full mb-2"></div>
                <div className="h-4 bg-custom-accent/20 rounded w-2/3 mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-custom-accent/20 rounded w-16"></div>
                  <div className="h-6 bg-custom-accent/20 rounded w-20"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 bg-custom-accent/20 rounded w-20"></div>
                  <div className="h-10 bg-custom-accent/20 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.1)" }}
                className="bg-custom-secondary/30 rounded-2xl p-8 relative group"
              >
                {/* Admin Controls */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditProject(project)}
                    className="p-2 hover:bg-custom-accent/20 hover:text-custom-accent"
                  >
                    <FaEdit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteProject(project)}
                    className="p-2 hover:bg-red-500/20 hover:text-red-400"
                    disabled={deleteProjectMutation.isPending}
                  >
                    <FaTrash className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3 text-custom-text-primary">
                    {project.title}
                  </h3>
                  <p className="text-custom-text-secondary leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {project.createdAt && (
                    <div className="flex items-center text-custom-text-muted text-sm mb-4">
                      <FaCalendar className="mr-2" />
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <FaCode className="text-custom-accent mr-2" />
                    <span className="text-custom-text-muted text-sm font-medium">Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-custom-accent/20 text-custom-accent px-3 py-1 rounded-full text-sm font-jetbrains"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(project.githubUrl!, '_blank')}
                      className="border-custom-accent/30 text-custom-accent hover:bg-custom-accent/10"
                    >
                      <FaGithub className="mr-2 w-4 h-4" />
                      Code
                    </Button>
                  )}
                  
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(project.liveUrl!, '_blank')}
                      className="border-custom-accent/30 text-custom-accent hover:bg-custom-accent/10"
                    >
                      <FaExternalLinkAlt className="mr-2 w-4 h-4" />
                      Live Demo
                    </Button>
                  )}
                  
                  {project.downloadUrl && (
                    <Button
                      size="sm"
                      onClick={() => handleDownload(project.downloadUrl!, project.title)}
                      className="bg-gradient-to-r from-custom-accent to-custom-accent-hover text-custom-primary hover:shadow-lg hover:shadow-custom-accent/30 transition-all duration-300"
                    >
                      <FaDownload className="mr-2 w-4 h-4" />
                      Download
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {projects && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-custom-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCode className="text-custom-accent text-3xl" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No Projects Yet</h3>
            <p className="text-custom-text-muted mb-8 max-w-md mx-auto">
              Start showcasing your work by adding your first project.
            </p>
            <Button
              onClick={handleCreateProject}
              className="bg-gradient-to-r from-custom-accent to-custom-accent-hover px-8 py-3 rounded-full text-custom-primary font-semibold"
            >
              <FaPlus className="mr-2" />
              Create Your First Project
            </Button>
          </motion.div>
        )}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={editProject}
        mode={modalMode}
      />
    </section>
  );
}