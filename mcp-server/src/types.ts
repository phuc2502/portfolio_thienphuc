import { z } from 'zod';

// Project Schema
export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    hoverTitle: z.string(),
    cat: z.string(),
    url: z.string().url(),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    year: z.string(),
    brief: z.string(),
    strategy: z.string(),
    technical: z.string(),
    methodology: z.array(z.string()),
    ba_focus: z.array(z.string()),
    tech_stack: z.array(z.string()),
    outcomes: z.array(z.object({
        label: z.string(),
        value: z.string(),
        desc: z.string()
    }))
});

export type Project = z.infer<typeof ProjectSchema>;

// Skill Schema
export const SkillSchema = z.object({
    id: z.string(),
    category: z.string(),
    name: z.string(),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
    yearsOfExperience: z.number(),
    description: z.string().optional()
});

export type Skill = z.infer<typeof SkillSchema>;

// Experience Schema
export const ExperienceSchema = z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean(),
    description: z.string(),
    achievements: z.array(z.string()),
    technologies: z.array(z.string())
});

export type Experience = z.infer<typeof ExperienceSchema>;

// Portfolio Data Schema
export const PortfolioDataSchema = z.object({
    projects: z.array(ProjectSchema),
    skills: z.array(SkillSchema),
    experiences: z.array(ExperienceSchema),
    metadata: z.object({
        lastUpdated: z.string(),
        version: z.string()
    })
});

export type PortfolioData = z.infer<typeof PortfolioDataSchema>;
