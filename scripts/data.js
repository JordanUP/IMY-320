/*
    Every course on the site. Each course has 4 lessons (called "modules" here),
    and each lesson has a title, a one-line focus, and 4 tasks the learner ticks off.

    To add a course: copy one object, give it a unique "cat", and keep
    4 lessons of 4 tasks. The catalogue, course page, lessons, profile and certificate
    all pick it up automatically.

*/

export const COURSES = [
    {
        cat: "digital-painting-foundations",
        title: "Digital Painting Foundations",
        instructor: "Alice B.",
        category: "Digital Painting",
        level: "Beginner",
        durationHours: 6,
        rating: 4.8,
        description: "Build a fully painted scene, from blank canvas to finished piece, stroke by stroke.",
        summary: "An introduction to digital painting focusing on: values, colour, brushwork and composition. By the end of this course you'll have something you'd actually hang on your wall.",
        finishedPiece: "One fully rendered environment painting, layered and saved in your working file so you can see every stage.",
        modules: [
            {
                title: "Seeing in Values",
                focus: "Light, shadow, and composition",
                tasks: [
                    "Identify the lightest and darkest areas in a reference image.",
                    "Reduce a landscape reference to three values.",
                    "Block in the foreground, middle ground, and background.",
                    "Check the composition using a greyscale thumbnail."
                ]
            },
            {
                title: "Building a Palette",
                focus: "Colour relationships",
                tasks: [
                    "Choose a mood for your environment.",
                    "Create a limited palette of five colours.",
                    "Apply colour over your greyscale study.",
                    "Compare the coloured version with the original value study."
                ]
            },
            {
                title: "Brushwork & Texture",
                focus: "Materials and depth",
                tasks: [
                    "Select brushes for foliage, stone, and clouds.",
                    "Paint three different material textures.",
                    "Use softer edges to push distant objects back.",
                    "Add texture without losing the main shapes."
                ]
            },
            {
                title: "The Finishing Pass",
                focus: "Refinement and export",
                tasks: [
                    "Strengthen the focal point of your painting.",
                    "Clean up important edges and silhouettes.",
                    "Review the final image at thumbnail size.",
                    "Export the finished painting and save the layered file."
                ]
            }
        ],
        instructorBio: "Alice has worked as a background painter for animated shorts and teaches the way she wishes she'd been taught: less theory, more practice.",
        bannerImg: "class01.jpg"
    },
    {
        cat: "character-design-illustration",
        title: "Character Design & Illustration",
        instructor: "Bob C.",
        category: "Character Design",
        level: "Intermediate",
        durationHours: 7,
        rating: 4.9,
        description: "Design an original character reference sheet: full body, expressions, colour palette and a final render.",
        summary: "Take an original character from a rough idea to a full character sheet telling who they are with a polished final illustration.",
        finishedPiece: "A complete character sheet - silhouette, multiple angles and one finished full-colour illustration.",
        modules: [
            {
                title: "Silhouette & Shape Language",
                focus: "Shape and character role",
                tasks: [
                    "Brainstorm three concepts for an original character.",
                    "Draw five quick silhouette variations.",
                    "Use simple shapes to communicate the character's role.",
                    "Select and refine your strongest silhouette."
                ]
            },
            {
                title: "Personality & Palette",
                focus: "Personality and colour",
                tasks: [
                    "Write three personality traits for your character.",
                    "Choose proportions that support those traits.",
                    "Create two alternative colour palettes.",
                    "Select a final palette and apply it to your design."
                ]
            },
            {
                title: "Expression & Pose",
                focus: "Expression and movement",
                tasks: [
                    "Draw a neutral front-facing character view.",
                    "Create front, side, and back turnaround sketches.",
                    "Draw four facial expressions.",
                    "Sketch three poses that communicate different emotions."
                ]
            },
            {
                title: "Final Render",
                focus: "Polish and presentation",
                tasks: [
                    "Choose your strongest character pose.",
                    "Refine the linework and important details.",
                    "Add colour, shading, and highlights.",
                    "Assemble and export your final character sheet."
                ]
            }
        ],
        instructorBio: "Bob designs characters for indie games and comics.",
        bannerImg: "class02.jpg"
    },
    {
        cat: "dynamic-anatomy-illustrators",
        title: "Dynamic Anatomy for Illustrators",
        instructor: "Charlie D.",
        category: "Anatomy",
        level: "Intermediate",
        durationHours: 8,
        rating: 4.7,
        description: "Gesture, weight and proportion, applied straight to a finished pose.",
        summary: "Anatomy taught through gesture and weight rather than intricate muscle charts, ending in a dynamic, believable pose.",
        finishedPiece: "One finished action-pose illustration, built up from gesture through to rendered figure.",
        modules: [
            {
                title: "Gesture First",
                focus: "Movement and balance",
                tasks: [
                    "Identify the line of action in a reference pose.",
                    "Complete five quick gesture sketches.",
                    "Mark the figure's centre of gravity.",
                    "Choose a gesture that communicates clear movement."
                ]
            },
            {
                title: "Structure Over Gesture",
                focus: "Simplified forms and structure",
                tasks: [
                    "Break the torso into simple geometric forms.",
                    "Build the pelvis and rib cage around your gesture.",
                    "Connect the limbs using simplified shapes.",
                    "Refine the figure while preserving the original movement."
                ]
            },
            {
                title: "Foreshortening",
                focus: "Depth and perspective",
                tasks: [
                    "Identify which body parts are closest to the viewer.",
                    "Sketch a limb extending towards the viewer.",
                    "Overlap body shapes to establish depth.",
                    "Correct proportions in your foreshortened pose."
                ]
            },
            {
                title: "Render the Pose",
                focus: "Light, shadow, and finish",
                tasks: [
                    "Establish the main light source.",
                    "Separate the figure into light and shadow shapes.",
                    "Add selected anatomical details.",
                    "Complete a rendered action-pose illustration."
                ]
            }
        ],
        instructorBio: "Charlie has taught figure drawing for over 2 decades and illustrates for board game rule books on the side.",
        bannerImg: "class03.jpg"
    },
    {
        cat: "krita-workflows",
        title: "Krita Workflows",
        instructor: "Dustin E.",
        category: "Krita Workflows",
        level: "Beginner",
        durationHours: 4,
        rating: 4.8,
        description: "Set up brushes, shortcuts and layers in Krita so the tools stops getting in your way.",
        summary: "A short, practical walkthrough of Krita: brush setup, shortcuts, layers and canvas navigation, so the software stops being the hard part.",
        finishedPiece: "A personal brush kit and shortcut cheat sheet you'll reuse in every painting from now on.",
        modules: [
            {
                title: "Canvas & Navigation",
                focus: "Canvas control and shortcuts",
                tasks: [
                    "Create a new canvas with your preferred dimensions.",
                    "Practise zooming in and out of the canvas.",
                    "Set up canvas rotation and mirroring shortcuts.",
                    "Save a workspace layout that suits your workflow."
                ]
            },
            {
                title: "Brush Setup",
                focus: "Brushes and settings",
                tasks: [
                    "Explore the brush preset library.",
                    "Select one brush for sketching and one for painting.",
                    "Adjust brush size, opacity, and stabilisation.",
                    "Save your favourite brushes in a personal brush kit."
                ]
            },
            {
                title: "Layers & Clipping",
                focus: "Organising your artwork",
                tasks: [
                    "Create and rename layers for a simple illustration.",
                    "Reorder layers to control which objects appear in front.",
                    "Apply a clipping mask to colour within a shape.",
                    "Organise your layers into clearly named groups."
                ]
            },
            {
                title: "Export & Backup",
                focus: "Saving and protecting your work",
                tasks: [
                    "Configure Krita's autosave settings.",
                    "Save your project as a .kra file.",
                    "Export a copy of your artwork as a PNG.",
                    "Create a backup folder for your project files."
                ]
            }
        ],
        instructorBio: "Dustin runs a tech shop on the side and has onboarded hundreds of students onto Krita.",
        bannerImg: "class04.jpg"
    },
    {
        cat: "environment-sketching",
        title: "Environment Sketching Basics",
        instructor: "Elijah F.",
        category: "Digital Painting",
        level: "Beginner",
        durationHours: 5,
        rating: 4.6,
        description: "Block in perspective and light to turn a blank page into a believable place.",
        summary: "Perspective and lighting basics applied directly to sketching believable places, not abstract areas.",
        finishedPiece: "One finished environmental sketch, from perspective grid to readable scene.",
        modules: [
            {
                title: "Understanding Perspective",
                focus: "Perspective fundamentals",
                tasks: [
                    "Identify the horizon line in a reference image.",
                    "Place a vanishing point on your canvas.",
                    "Sketch a simple street using one-point perspective.",
                    "Build a row of buildings using two-point perspective."
                ]
            },
            {
                title: "Blocking Out the Environment",
                focus: "Composition and scene layout",
                tasks: [
                    "Choose a location for your environment sketch.",
                    "Divide the scene into foreground, middle ground, and background.",
                    "Place the largest structures using simple shapes.",
                    "Refine the composition to guide the viewer's eye."
                ]
            },
            {
                title: "Placing Light",
                focus: "Light and shadow",
                tasks: [
                    "Choose a direction for the main light source.",
                    "Mark the cast shadows of buildings and objects.",
                    "Separate the scene into light and shadow areas.",
                    "Use contrast to emphasise the focal point."
                ]
            },
            {
                title: "Finishing the Sketch",
                focus: "Detail and finishing",
                tasks: [
                    "Refine the most important architectural details.",
                    "Add small environmental elements for scale.",
                    "Clean up perspective and overlapping shapes.",
                    "Export your finished environmental sketch."
                ]
            }
        ],
        instructorBio: "Elijah has been a professional painter for more than 35 years, lending his skills to many animation studios.",
        bannerImg: "class05.jpg"
    },
    {
        cat: "expressive-portraits",
        title: "Expressive Portraits",
        instructor: "Fanny G.",
        category: "Anatomy",
        level: "Advanced",
        durationHours: 10,
        rating: 4.9,
        description: "Push likeness and mood together in a finished portrait study.",
        summary: "An advanced portrait course focused on keeping the likeness and mood of the subject together at the same time.",
        finishedPiece: "One finished portrait study that captures the essence and likeness of the chosen subject.",
        modules: [
            {
                title: "Basic Construction",
                focus: "Head construction",
                tasks: [
                    "Choose a portrait reference with clear facial features.",
                    "Block in the head using simplified geometric forms.",
                    "Establish the facial centre line and eye line.",
                    "Sketch the major facial features before adding detail."
                ]
            },
            {
                title: "Likeness Checkpoints",
                focus: "Proportion and accuracy",
                tasks: [
                    "Compare the width and height of the head with your reference.",
                    "Check the spacing and alignment of the eyes.",
                    "Refine the nose, mouth, and jaw proportions.",
                    "Review the likeness before moving into detailed rendering."
                ]
            },
            {
                title: "Mood & Lighting",
                focus: "Atmosphere and light",
                tasks: [
                    "Choose three words to describe the portrait's intended mood.",
                    "Select a lighting direction that supports that mood.",
                    "Establish the main light and shadow shapes.",
                    "Test a colour palette that reinforces the atmosphere."
                ]
            },
            {
                title: "Polishing the Portrait",
                focus: "Refinement and export",
                tasks: [
                    "Refine the eyes, nose, mouth, and other focal features.",
                    "Vary edge softness to create depth and emphasis.",
                    "Balance detail with broader, expressive brushwork.",
                    "Export the final portrait study."
                ]
            }
        ],
        instructorBio: "Fanny runs an art studio, teaching the youth what makes art so fun. Also a huge BeeGees fan.",
        bannerImg: "class06.jpg"
    },
    {
        cat: "colour-theory-essentials",
        title: "Colour Theory Essentials",
        instructor: "Gabriel H.",
        category: "Digital Painting",
        level: "Beginner",
        durationHours: 5,
        rating: 4.7,
        description: "Understand hue, value and saturation, then use them to colour a simple scene with confidence.",
        summary: "A practical introduction to colour: how hue, value and saturation work together, and how harmonies and light temperature make a picture read clearly.",
        finishedPiece: "One finished colour study of a simple scene, saved with a swatch strip of your palette.",
        modules: [
            {
                title: "Hue, Value & Saturation",
                focus: "The three properties of colour",
                tasks: [
                    "Sort a set of colour swatches by hue, value, and saturation.",
                    "Convert a colourful image to greyscale to check its values.",
                    "Adjust one colour's saturation without changing its value.",
                    "Paint a simple gradient strip for each of the three properties."
                ]
            },
            {
                title: "Colour Harmonies",
                focus: "Palettes that work together",
                tasks: [
                    "Identify the dominant colours in a favourite artwork.",
                    "Build one complementary and one analogous palette.",
                    "Paint the same simple shape using each palette.",
                    "Choose the harmony that best suits your subject."
                ]
            },
            {
                title: "Warm & Cool Light",
                focus: "Temperature and atmosphere",
                tasks: [
                    "Pick a warm or cool main light for your scene.",
                    "Paint shadows in the opposite temperature.",
                    "Compare your scene at sunrise and at midday.",
                    "Adjust one colour to strengthen the mood."
                ]
            },
            {
                title: "The Colour Study",
                focus: "Putting it all together",
                tasks: [
                    "Sketch a simple scene with three main shapes.",
                    "Apply your chosen palette and light temperature.",
                    "Check the final study in greyscale.",
                    "Export the study with a swatch strip of your palette."
                ]
            }
        ],
        instructorBio: "Gabriel colours storyboards for small animation teams and teaches colour as a handful of simple choices, not rules to memorise.",
        bannerImg: "class07.jpg"
    },
    {
        cat: "composition-visual-storytelling",
        title: "Composition & Visual Storytelling",
        instructor: "Hannah I.",
        category: "Illustration",
        level: "Intermediate",
        durationHours: 6,
        rating: 4.8,
        description: "Arrange shapes, space and focus so a single image tells a clear story.",
        summary: "Learn how composition guides the eye and carries a story, from first thumbnails to a finished single-image illustration.",
        finishedPiece: "One finished illustration that tells a small story at a glance, saved with the thumbnails that led to it.",
        modules: [
            {
                title: "Thumbnail Sketching",
                focus: "Fast ideas at small size",
                tasks: [
                    "Write a one-sentence story for your illustration.",
                    "Draw eight small thumbnails of the scene.",
                    "Mark the focal point in each thumbnail.",
                    "Choose the two strongest thumbnails to develop."
                ]
            },
            {
                title: "Guiding the Eye",
                focus: "Lines, shapes, and contrast",
                tasks: [
                    "Add leading lines that point towards the focal point.",
                    "Use the rule of thirds to place your main subject.",
                    "Create a contrast of size or value around the focal point.",
                    "Squint at the sketch to check where the eye lands first."
                ]
            },
            {
                title: "Space & Depth",
                focus: "Foreground, middle ground, and background",
                tasks: [
                    "Divide your chosen thumbnail into three depth layers.",
                    "Overlap shapes to separate the layers.",
                    "Place a small detail in the foreground to frame the scene.",
                    "Fade background detail with softer edges and lighter values."
                ]
            },
            {
                title: "Telling the Story",
                focus: "Details that support the idea",
                tasks: [
                    "List three details that support your one-sentence story.",
                    "Add those details without crowding the focal point.",
                    "Review the image at thumbnail size to check it still reads.",
                    "Export your final illustration alongside your best thumbnail."
                ]
            }
        ],
        instructorBio: "Hannah illustrates picture books and magazine covers, and believes every good image starts with one clear idea.",
        bannerImg: "class08.jpg"
    },
    {
        cat: "creature-design-from-nature",
        title: "Creature Design from Nature",
        instructor: "Isaac J.",
        category: "Character Design",
        level: "Intermediate",
        durationHours: 8,
        rating: 4.8,
        description: "Invent an original creature by borrowing shapes, textures and behaviours from real animals.",
        summary: "Use reference from the natural world to design a believable creature, from first silhouettes to a finished concept sheet.",
        finishedPiece: "A creature concept sheet with silhouette studies, a colour scheme and detail drawings.",
        modules: [
            {
                title: "Animal Reference",
                focus: "Studying real anatomy",
                tasks: [
                    "Gather reference for three animals you find interesting.",
                    "Sketch the skeleton and main body shapes of each.",
                    "Note one distinctive feature from each animal.",
                    "Choose two animals to combine in your design."
                ]
            },
            {
                title: "Silhouette & Habitat",
                focus: "Shape and environment",
                tasks: [
                    "Describe where your creature lives in one sentence.",
                    "Draw six silhouette variations of your creature.",
                    "Adjust the silhouette to suit its habitat.",
                    "Select the silhouette with the clearest shape."
                ]
            },
            {
                title: "Surface & Colour",
                focus: "Skin, fur, and camouflage",
                tasks: [
                    "Choose a surface type such as fur, scales, or feathers.",
                    "Sketch how the surface changes across the body.",
                    "Create a colour scheme based on its habitat.",
                    "Add one pattern or marking that serves a purpose."
                ]
            },
            {
                title: "The Concept Sheet",
                focus: "Presenting the creature",
                tasks: [
                    "Draw your creature in a clear side view.",
                    "Add a front or three-quarter view.",
                    "Sketch two small detail studies of key features.",
                    "Assemble and export your creature concept sheet."
                ]
            }
        ],
        instructorBio: "Isaac designs creatures for indie games and fills his sketchbooks on weekend trips to the zoo.",
        bannerImg: "class09.jpg"
    },
    {
        cat: "hands-and-feet-made-simple",
        title: "Hands & Feet Made Simple",
        instructor: "Jade K.",
        category: "Anatomy",
        level: "Beginner",
        durationHours: 5,
        rating: 4.6,
        description: "Break hands and feet into simple shapes you can draw from any angle.",
        summary: "Anatomy for the parts that scare people most: simple construction methods for hands and feet, ending in a confident study sheet.",
        finishedPiece: "One finished study sheet of hands and feet drawn from several angles.",
        modules: [
            {
                title: "Hand Proportions",
                focus: "Basic shapes and measurements",
                tasks: [
                    "Draw the palm as a simple block.",
                    "Divide each finger into three segments.",
                    "Compare finger lengths using a reference hand.",
                    "Complete five quick hand sketches from reference."
                ]
            },
            {
                title: "Hand Poses",
                focus: "Gesture and grip",
                tasks: [
                    "Draw a relaxed open hand.",
                    "Draw a closed fist from two angles.",
                    "Sketch a hand holding a simple object.",
                    "Place the thumb correctly in each pose."
                ]
            },
            {
                title: "Feet & Ankles",
                focus: "Structure and balance",
                tasks: [
                    "Draw the foot as a wedge with a flat base.",
                    "Add the arch and the toes as simple shapes.",
                    "Sketch a foot from the side and from above.",
                    "Connect the foot to the ankle and lower leg."
                ]
            },
            {
                title: "The Study Sheet",
                focus: "Combining what you learned",
                tasks: [
                    "Arrange six of your best hand and foot sketches on one page.",
                    "Refine two sketches with cleaner lines.",
                    "Add simple shading to show form.",
                    "Export your finished study sheet."
                ]
            }
        ],
        instructorBio: "Jade has taught life drawing classes for over ten years and insists that hands are easier than they look.",
        bannerImg: "class10.jpg"
    },
    {
        cat: "comic-page-layout",
        title: "Comic Page Layout",
        instructor: "Kai L.",
        category: "Illustration",
        level: "Intermediate",
        durationHours: 7,
        rating: 4.7,
        description: "Plan panels, pacing and speech so a comic page is easy and exciting to read.",
        summary: "From script to finished page: how panel size, order and gutters control pacing, plus the basics of lettering.",
        finishedPiece: "One finished comic page with panels, artwork and lettering, ready to share.",
        modules: [
            {
                title: "Script & Beats",
                focus: "Planning the story",
                tasks: [
                    "Write a short scene of four to six story beats.",
                    "Decide which beat deserves the largest panel.",
                    "Sketch quick thumbnails of the page layout.",
                    "Choose the thumbnail with the clearest reading order."
                ]
            },
            {
                title: "Panels & Gutters",
                focus: "Rhythm and flow",
                tasks: [
                    "Draw the panel borders at page size.",
                    "Vary panel sizes to match your beats.",
                    "Check that the eye moves from panel to panel in order.",
                    "Adjust the gutters so no panels feel crowded."
                ]
            },
            {
                title: "Roughs & Inks",
                focus: "Drawing the page",
                tasks: [
                    "Rough in the figures and backgrounds in each panel.",
                    "Vary the camera angle across the panels.",
                    "Ink the final linework on a new layer.",
                    "Clean up overlaps between panels and characters."
                ]
            },
            {
                title: "Lettering & Finish",
                focus: "Words and polish",
                tasks: [
                    "Place speech bubbles so they follow the reading order.",
                    "Letter the dialogue clearly and consistently.",
                    "Add simple tones or colour to separate foreground from background.",
                    "Export the finished page as a PNG."
                ]
            }
        ],
        instructorBio: "Kai self-publishes a weekly webcomic and has lettered pages for several small presses.",
        bannerImg: "class11.jpg"
    },
    {
        cat: "procreate-essentials",
        title: "Procreate Essentials",
        instructor: "Lena M.",
        category: "Procreate Workflows",
        level: "Beginner",
        durationHours: 4,
        rating: 4.8,
        description: "Learn the Procreate interface, brushes and layers so you can start drawing straight away.",
        summary: "A short, friendly tour of Procreate on iPad: gestures, brushes, layers and exporting, so the app becomes a tool and not a puzzle.",
        finishedPiece: "A personal brush set and a small finished sketch you can reuse as a template.",
        modules: [
            {
                title: "Canvas & Gestures",
                focus: "Getting around the app",
                tasks: [
                    "Create a new canvas with your chosen size.",
                    "Practise pinch, rotate, and two-finger tap gestures.",
                    "Turn on the drawing guide to show a simple grid.",
                    "Save your canvas settings as a reusable template."
                ]
            },
            {
                title: "Brushes & Settings",
                focus: "Finding your tools",
                tasks: [
                    "Browse the brush library and test five brushes.",
                    "Pick one brush for sketching and one for colour.",
                    "Adjust brush size and opacity using the sidebar sliders.",
                    "Create a custom brush set with your favourites."
                ]
            },
            {
                title: "Layers & Colour",
                focus: "Organising your artwork",
                tasks: [
                    "Create separate layers for sketch, colour, and shadows.",
                    "Fill a shape using ColorDrop.",
                    "Use a clipping mask to shade within the shape.",
                    "Group and name your layers clearly."
                ]
            },
            {
                title: "Export & Share",
                focus: "Saving and sharing",
                tasks: [
                    "Save your artwork to the gallery.",
                    "Export a copy as a PNG.",
                    "Export a layered copy as a PSD.",
                    "Export the time-lapse video of your sketch."
                ]
            }
        ],
        instructorBio: "Lena draws on her iPad during her daily train commute and has introduced hundreds of beginners to Procreate.",
        bannerImg: "class12.jpg"
    },
    {
        cat: "rendering-materials",
        title: "Rendering Materials",
        instructor: "Mateo N.",
        category: "Digital Painting",
        level: "Advanced",
        durationHours: 9,
        rating: 4.9,
        description: "Paint convincing metal, glass, fabric and skin by understanding how each one reflects light.",
        summary: "An advanced course on reading and painting materials: how light behaves on each surface, and how to suggest it with a few confident strokes.",
        finishedPiece: "A material study sheet and one finished still-life painting that uses at least three materials.",
        modules: [
            {
                title: "Reading Reflections",
                focus: "How light behaves on surfaces",
                tasks: [
                    "Choose a reference photo with several materials.",
                    "Identify the highlights, midtones, and reflected light.",
                    "Separate matte and glossy surfaces by their highlights.",
                    "Paint a sphere in two different materials."
                ]
            },
            {
                title: "Metal & Glass",
                focus: "Hard and reflective surfaces",
                tasks: [
                    "Paint a metal object using sharp value contrast.",
                    "Add reflections of the surrounding colours.",
                    "Paint a glass object using transparency and highlights.",
                    "Compare your metal and glass studies side by side."
                ]
            },
            {
                title: "Fabric & Skin",
                focus: "Soft and organic surfaces",
                tasks: [
                    "Paint folds in fabric using soft, directional shading.",
                    "Add a pattern that follows the folds.",
                    "Paint skin with warm lights and cooler shadows.",
                    "Add subtle texture without overworking the surface."
                ]
            },
            {
                title: "The Still Life",
                focus: "Combining materials",
                tasks: [
                    "Arrange a still life using at least three materials.",
                    "Block in values and colours for the whole scene.",
                    "Render each material with its own highlights and edges.",
                    "Export the finished painting and your study sheet."
                ]
            }
        ],
        instructorBio: "Mateo paints props and still lifes for animation studios and is endlessly curious about how things catch light.",
        bannerImg: "class13.jpg"
    },
    {
        cat: "whimsical-illustration-storytelling",
        title: "Whimsical Illustration & Storytelling",
        instructor: "Nathaniel O.",
        category: "Illustration",
        level: "Beginner",
        durationHours: 5,
        rating: 4.9,
        description: "Learn to create charming illustrations filled with personality, colour, and visual storytelling.",
        summary: "Learn to create charming illustrations filled with personality, colour, and visual storytelling. Turn everyday ideas into a cohesive illustrated scene.",
        finishedPiece: "One polished storybook-style illustration featuring original characters and a colourful setting.",
        modules: [
            {
                title: "Finding Inspiration & Gathering References",
                focus: "Ideas, references, and mood",
                tasks: [
                    "Collect five reference images that inspire your illustration.",
                    "Choose a theme for your storybook scene.",
                    "Create a mood board using colours, objects, and environments.",
                    "Sketch three possible ideas for your illustration."
                ]
            },
            {
                title: "Simplifying Shapes & Creating Characters",
                focus: "Simple shapes and expressive characters",
                tasks: [
                    "Break a reference animal or object into simple shapes.",
                    "Design three expressive character silhouettes.",
                    "Add facial features that communicate different emotions.",
                    "Choose a character and sketch it in three different poses."
                ]
            },
            {
                title: "Colour, Mood & Visual Storytelling",
                focus: "Mood, hierarchy, and story details",
                tasks: [
                    "Choose a colour palette that matches your intended mood.",
                    "Sketch a setting that supports your character's story.",
                    "Use size and placement to establish a visual hierarchy.",
                    "Add small environmental details that suggest a story."
                ]
            },
            {
                title: "Finishing Your Storybook Illustration",
                focus: "Refinement and export",
                tasks: [
                    "Refine the linework and silhouettes.",
                    "Apply your final colours and shading.",
                    "Add decorative details and background textures.",
                    "Export your completed storybook illustration."
                ]
            }
        ],
        instructorBio: "Grace creates whimsical illustrations for children's books, stationery, and independent publishing projects.",
        bannerImg: "class14.jpg"
    },
    {
        cat: "creature-design-concept-art",
        title: "Creature Design & Concept Art",
        instructor: "Oman P.",
        category: "Character Design",
        level: "Intermediate",
        durationHours: 7,
        rating: 4.8,
        description: "Design original creatures for games, films, and fantasy worlds by combining animal references, imaginative shapes, and believable anatomy.",
        summary: "Design original creatures for games, films, and fantasy worlds by combining animal references, imaginative shapes, and believable anatomy.",
        finishedPiece: "A complete creature concept sheet featuring multiple designs, a selected creature, and a final colour illustration.",
        modules: [
            {
                title: "Animal References & Design Inspiration",
                focus: "Reference and early concepts",
                tasks: [
                    "Collect reference images of three different animals.",
                    "Identify distinctive features from each animal.",
                    "Combine selected features into two creature concepts.",
                    "Write a short description of your creature's habitat and behaviour."
                ]
            },
            {
                title: "Silhouettes, Shapes & Creature Identity",
                focus: "Shape and creature identity",
                tasks: [
                    "Sketch six creature silhouettes using simple shapes.",
                    "Experiment with different body proportions.",
                    "Use horns, tails, wings, or other features to create variety.",
                    "Select your strongest silhouette and refine its outline."
                ]
            },
            {
                title: "Anatomy, Features & Surface Texture",
                focus: "Anatomy, features, and texture",
                tasks: [
                    "Block in the creature's body using basic anatomical forms.",
                    "Refine how the limbs connect to the torso.",
                    "Design a texture study for scales, fur, feathers, or skin.",
                    "Add facial features that communicate the creature's personality."
                ]
            },
            {
                title: "Final Creature Concept Sheet",
                focus: "Presenting the final concept",
                tasks: [
                    "Draw a clean full-body view of your creature.",
                    "Create a secondary view showing its proportions.",
                    "Choose a colour palette that suits its habitat.",
                    "Assemble the final concept sheet with labels and detail studies."
                ]
            }
        ],
        instructorBio: "Henry specialises in fantasy creature concepts and has worked on independent games and tabletop projects.",
        bannerImg: "class15.jpg"
    },
    {
        cat: "pixel-art-for-games",
        title: "Pixel Art for Games",
        instructor: "Pamela Q.",
        category: "Pixel Art",
        level: "Beginner",
        durationHours: 4,
        rating: 4.7,
        description: "Explore the fundamentals of pixel art, from clean silhouettes and limited palettes to tilesets and tiny animated details.",
        summary: "Explore the fundamentals of pixel art, from clean silhouettes and limited palettes to tilesets and tiny animated details.",
        finishedPiece: "A small pixel-art environment containing a character, scenery, and reusable game assets.",
        modules: [
            {
                title: "Pixel Art Fundamentals & Canvas Setup",
                focus: "Canvas setup and clean lines",
                tasks: [
                    "Create a small canvas suitable for a pixel-art sprite.",
                    "Practise drawing clean lines and basic geometric shapes.",
                    "Design a simple object using a limited number of pixels.",
                    "Clean up stray pixels and uneven outlines."
                ]
            },
            {
                title: "Colour Palettes & Shading",
                focus: "Limited palettes and light",
                tasks: [
                    "Build a palette using four to six colours.",
                    "Shade a simple object using light and shadow.",
                    "Add highlights to communicate material and form.",
                    "Compare how different palettes change an object's mood."
                ]
            },
            {
                title: "Sprites, Tiles & Environment Design",
                focus: "Characters, tiles, and scenery",
                tasks: [
                    "Design a small playable character sprite.",
                    "Create a reusable grass or stone ground tile.",
                    "Draw tiles for a basic environment.",
                    "Assemble the tiles into a small game scene."
                ]
            },
            {
                title: "Animation & Final Scene Assembly",
                focus: "Movement and final scene",
                tasks: [
                    "Create two frames of a simple character animation.",
                    "Add frames to produce a basic walking cycle.",
                    "Place your character into the completed environment.",
                    "Export the final scene and animated sprite."
                ]
            }
        ],
        instructorBio: "Ivy creates pixel art for indie games and enjoys teaching artists how to communicate ideas with limited pixels.",
        bannerImg: "class16.jpg"
    },
    {
        cat: "digital-watercolour-botanical",
        title: "Digital Watercolour & Botanical Illustration",
        instructor: "Quentin R.",
        category: "Illustration",
        level: "Beginner",
        durationHours: 6,
        rating: 4.9,
        description: "Recreate the soft washes, layered pigments, and delicate details of traditional watercolour using digital brushes and painting techniques.",
        summary: "Recreate the soft washes, layered pigments, and delicate details of traditional watercolour using digital brushes and painting techniques.",
        finishedPiece: "A finished botanical illustration featuring a selection of flowers, leaves, and natural details.",
        modules: [
            {
                title: "Watercolour Brushes & Washes",
                focus: "Brushes and washes",
                tasks: [
                    "Explore brushes that simulate watercolour effects.",
                    "Create a set of light, medium, and dark colour washes.",
                    "Experiment with brush opacity and water-like textures.",
                    "Build a small digital watercolour swatch sheet."
                ]
            },
            {
                title: "Observing Botanical Shapes",
                focus: "Observing plant forms",
                tasks: [
                    "Select a flower or plant as your reference.",
                    "Break the plant into simple shapes and major forms.",
                    "Sketch the petals, leaves, and stem.",
                    "Refine the proportions and arrangement of the plant."
                ]
            },
            {
                title: "Layering Colour & Creating Texture",
                focus: "Depth, layering, and texture",
                tasks: [
                    "Apply a light base wash to your botanical sketch.",
                    "Layer darker colours to establish depth.",
                    "Add subtle variations to petals and leaves.",
                    "Use textured brushes to create natural-looking edges."
                ]
            },
            {
                title: "Composing & Finishing a Botanical Plate",
                focus: "Composition and export",
                tasks: [
                    "Arrange your botanical elements into a balanced composition.",
                    "Refine the details of the flowers and leaves.",
                    "Add small labels or decorative elements.",
                    "Export your finished botanical illustration."
                ]
            }
        ],
        instructorBio: "Maya is an illustrator who creates botanical artwork for prints, journals, and nature-inspired stationery.",
        bannerImg: "class17.jpg"
    },
    {
        cat: "comic-art-visual-storytelling",
        title: "Comic Art & Visual Storytelling",
        instructor: "Richard S.",
        category: "Illustration",
        level: "Intermediate",
        durationHours: 6,
        rating: 4.8,
        description: "Learn to turn a simple idea into a compelling comic page using panel layouts, expressive characters, dynamic poses, and readable visual storytelling.",
        summary: "Learn to turn a simple idea into a compelling comic page using panel layouts, expressive characters, dynamic poses, and readable visual storytelling.",
        finishedPiece: "One completed comic page with a clear sequence of events, expressive artwork, and polished lettering.",
        modules: [
            {
                title: "Planning Your Story",
                focus: "Story ideas and thumbnails",
                tasks: [
                    "Write a short story idea that can be told in four to six panels.",
                    "Identify the beginning, middle, and end of your scene.",
                    "Create thumbnail sketches for your comic page.",
                    "Choose the strongest sequence of panels."
                ]
            },
            {
                title: "Panel Layouts & Composition",
                focus: "Layout and reading flow",
                tasks: [
                    "Experiment with different panel sizes and arrangements.",
                    "Guide the reader's eye through the page.",
                    "Use close-ups and wide shots to establish visual variety.",
                    "Refine your chosen layout for readability."
                ]
            },
            {
                title: "Dynamic Characters & Inking",
                focus: "Expressive action and line work",
                tasks: [
                    "Sketch your character performing an expressive action.",
                    "Use gesture and exaggerated poses to communicate emotion.",
                    "Ink the main shapes using varied line weights.",
                    "Add shadows and background details to support the action."
                ]
            },
            {
                title: "Lettering & Final Comic Page",
                focus: "Words, clarity, and export",
                tasks: [
                    "Add dialogue and captions to your panels.",
                    "Place speech bubbles without hiding important artwork.",
                    "Check the reading order and clarity of each panel.",
                    "Export your finished comic page."
                ]
            }
        ],
        instructorBio: "Richard draws and writes short comics and teaches how to make a page easy and enjoyable to follow.",
        bannerImg: "class18.jpg"
    },
    {
        cat: "logo-design-visual-identity",
        title: "Logo Design & Visual Identity",
        instructor: "Sophie T.",
        category: "Graphic Design",
        level: "Beginner",
        durationHours: 5,
        rating: 4.9,
        description: "Discover how to transform a brand's personality into a recognisable logo using shape, typography, colour, and simple graphic design principles.",
        summary: "Discover how to transform a brand's personality into a recognisable logo using shape, typography, colour, and simple graphic design principles.",
        finishedPiece: "A small brand identity package containing a primary logo, alternate logo, colour palette, and typography selection.",
        modules: [
            {
                title: "Understanding the Brand",
                focus: "Brand personality and ideas",
                tasks: [
                    "Choose a fictional business or creative brand.",
                    "Identify three words that describe its personality.",
                    "Collect references for a visual mood board.",
                    "Sketch five logo ideas based on the brand's identity."
                ]
            },
            {
                title: "Shape, Symbols & Typography",
                focus: "Symbols, shapes, and type",
                tasks: [
                    "Experiment with geometric shapes for your logo.",
                    "Create a simple symbol that represents the brand.",
                    "Test three typography styles for the brand name.",
                    "Combine your strongest symbol and typography concepts."
                ]
            },
            {
                title: "Colour & Logo Refinement",
                focus: "Colour, spacing, and legibility",
                tasks: [
                    "Create two alternative colour palettes.",
                    "Test your logo in black and white.",
                    "Refine the spacing, alignment, and proportions.",
                    "Check that the logo remains readable at a small size."
                ]
            },
            {
                title: "Building the Brand Identity",
                focus: "The final identity package",
                tasks: [
                    "Create a secondary version of your logo.",
                    "Select final brand colours with their colour codes.",
                    "Choose complementary fonts for headings and body text.",
                    "Assemble and export a brand identity presentation sheet."
                ]
            }
        ],
        instructorBio: "Sophie designs logos and brand identities for small creative businesses and loves a simple mark that works at any size.",
        bannerImg: "class19.jpg"
    }
];