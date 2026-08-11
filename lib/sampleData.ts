import { SamplePreset } from './types';

// High resolution public royalty-free plant leaf sample images for instant judge demo
export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'tomato-blight',
    name: 'Tomato Leaf (Blight Signals)',
    crop: 'Tomato',
    disease: 'Early Blight (Alternaria solani)',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80',
    description: 'Shows classic brown concentric ring spots and yellowing halo on tomato leaves.',
  },
  {
    id: 'paddy-blast',
    name: 'Paddy / Rice (Leaf Blast)',
    crop: 'Rice / Paddy',
    disease: 'Magnaporthe oryzae',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    description: 'Spindle-shaped lesions with grayish centers on young rice foliage.',
  },
  {
    id: 'cotton-leaf',
    name: 'Cotton Leaf (Curl Virus)',
    crop: 'Cotton',
    disease: 'Cotton Leaf Curl Virus',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=600&q=80',
    description: 'Upward leaf curling, vein thickening, and stunted foliage growth.',
  },
];
