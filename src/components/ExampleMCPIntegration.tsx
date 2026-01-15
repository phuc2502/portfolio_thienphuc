/**
 * Example: Using MCP Portfolio Data in React
 * This shows how to integrate dynamic portfolio data from MCP server
 */

import React, { useState, useEffect } from 'react';

// Option 1: Direct import (simplest)
// import portfolioData from '../mcp-server/src/data/portfolio-data.json';

interface Project {
    id: string;
    title: string;
    cat: string;
    year: string;
    brief: string;
    tech_stack: string[];
    url: string;
    demoUrl?: string;
    repoUrl?: string;
}

interface PortfolioData {
    projects: Project[];
    skills: any[];
    experiences: any[];
    metadata: {
        lastUpdated: string;
        version: string;
    };
}

const ExampleMCPIntegration: React.FC = () => {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Option 2: Fetch from public folder (after running sync script)
        fetch('/portfolio-data.json')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load portfolio data');
                return res.json();
            })
            .then((portfolioData: PortfolioData) => {
                setData(portfolioData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        // Option 3: Fetch from API endpoint (if you create one)
        // fetch('http://localhost:3001/api/projects')
        //   .then(res => res.json())
        //   .then(projects => setProjects(projects));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white/60">Loading portfolio data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-12">
            {/* Metadata */}
            <div className="mb-12 opacity-40 mono text-xs">
                <p>Portfolio Version: {data.metadata.version}</p>
                <p>Last Updated: {new Date(data.metadata.lastUpdated).toLocaleString()}</p>
            </div>

            {/* Projects Section */}
            <section className="mb-20">
                <h2 className="text-4xl font-bold mb-8 uppercase tracking-tight">
                    Projects ({data.projects.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.projects.map((project) => (
                        <div
                            key={project.id}
                            className="border border-white/10 rounded-lg p-6 hover:border-white/30 transition-all group"
                        >
                            {/* Project Image */}
                            <div className="aspect-video mb-4 overflow-hidden rounded bg-white/5">
                                <img
                                    src={project.url}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                            {/* Project Info */}
                            <div className="mono text-[10px] text-white/20 uppercase tracking-wider mb-2">
                                {project.cat} // {project.year}
                            </div>

                            <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">
                                {project.title}
                            </h3>

                            <p className="text-sm text-white/60 mb-4 line-clamp-3">
                                {project.brief}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech_stack.slice(0, 3).map((tech, i) => (
                                    <span
                                        key={i}
                                        className="mono text-[8px] px-2 py-1 border border-white/10 rounded uppercase"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.tech_stack.length > 3 && (
                                    <span className="mono text-[8px] px-2 py-1 text-white/40">
                                        +{project.tech_stack.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-4">
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mono text-[8px] px-4 py-2 border border-white/20 rounded-full uppercase hover:bg-white hover:text-black transition-all"
                                    >
                                        DEMO
                                    </a>
                                )}
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mono text-[8px] px-4 py-2 border border-white/20 rounded-full uppercase hover:bg-white hover:text-black transition-all"
                                    >
                                        CODE
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section className="mb-20">
                <h2 className="text-4xl font-bold mb-8 uppercase tracking-tight">
                    Skills ({data.skills.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.skills.map((skill) => (
                        <div
                            key={skill.id}
                            className="border border-white/10 rounded-lg p-6 hover:border-white/30 transition-all"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold">{skill.name}</h3>
                                <span className="mono text-[10px] px-3 py-1 bg-white/5 rounded-full">
                                    {skill.level}
                                </span>
                            </div>

                            <div className="mono text-[10px] text-white/40 uppercase mb-3">
                                {skill.category} • {skill.yearsOfExperience} years
                            </div>

                            {skill.description && (
                                <p className="text-sm text-white/60">{skill.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Experiences Section */}
            <section>
                <h2 className="text-4xl font-bold mb-8 uppercase tracking-tight">
                    Experience ({data.experiences.length})
                </h2>

                <div className="space-y-8">
                    {data.experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="border-l-2 border-white/10 pl-8 hover:border-white/30 transition-all"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-2xl font-bold">{exp.position}</h3>
                                    <div className="mono text-sm text-white/60 mt-1">
                                        {exp.company} • {exp.location}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="mono text-xs text-white/40">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </div>
                                    {exp.current && (
                                        <span className="inline-block mt-2 mono text-[8px] px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
                                            CURRENT
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-white/60 mb-4">{exp.description}</p>

                            {/* Achievements */}
                            {exp.achievements && exp.achievements.length > 0 && (
                                <div className="mb-4">
                                    <div className="mono text-[10px] text-white/40 uppercase mb-2">
                                        Key Achievements:
                                    </div>
                                    <ul className="space-y-2">
                                        {exp.achievements.map((achievement: string, i: number) => (
                                            <li key={i} className="text-sm text-white/70 flex items-start">
                                                <span className="text-white/20 mr-2">▸</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Technologies */}
                            {exp.technologies && exp.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech: string, i: number) => (
                                        <span
                                            key={i}
                                            className="mono text-[8px] px-2 py-1 bg-white/5 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ExampleMCPIntegration;
