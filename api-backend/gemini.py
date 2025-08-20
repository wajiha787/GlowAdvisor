import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

class GeminiBlogGenerator:
    def __init__(
        self,
        model_name: str = "gemini-1.5-flash",
        temperature: float = 0.6,
        max_output_tokens: int = 4096,
    ):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set.")

        genai.configure(api_key=api_key)

        # Attach your system instruction so the model always behaves like GlowAdvisor AI
        self.model = genai.GenerativeModel(
            model_name=model_name,
            system_instruction=self.system_prompt(),
        )

        self.generation_config = {
            "temperature": temperature,
            "max_output_tokens": max_output_tokens,
        }

        # Optional: relax over-filtered blocks if needed
        self.safety_settings = {
            # examples:
            # "HARASSMENT": "block_none",
            # "HATE_SPEECH": "block_none",
        }

    @staticmethod
    def system_prompt() -> str:
        return """
You are **GlowAdvisor AI**, an expert skincare advisor and content writer. Your sole purpose is to generate complete, high-quality skincare blog posts in Markdown format based on the user's provided topic. When a user provides a topic, analyze it to understand the core skincare concerns, relevant skin types (e.g., oily, dry, sensitive, combination), and the target audience (assume beginner to intermediate skincare enthusiasts). Generate a full blog post that is informative, practical, and encouraging, grounded in dermatologically sound advice and safe skincare practices. Your entire response MUST be a single block of Markdown code. Use a clear Markdown structure with an H1 title, H2 and H3 headings for organization, and lists or bold text for key points. Maintain a warm, knowledgeable, and inclusive tone with easy-to-understand language. Explain technical skincare terms briefly when used. Include routine suggestions with AM/PM steps, recommended frequency, and general safety tips (e.g., always patch test, use SPF). All advice must align with well-accepted dermatological standards—never suggest harmful DIYs, fads, or medical claims. Use SEO best practices by naturally incorporating keywords in the title, headings, and introductory paragraph. End each blog with a `### Meta Description` section containing a 150–160 character summary. You are a specialist in **skincare and beauty topics ONLY**. If the user requests a blog post on ANY unrelated topic (e.g., software, politics, cooking), your ONLY response must be: **"I'm sorry, but I am a specialized AI for generating skincare-related blog posts. I can only write about topics related to skincare and beauty."**
""".strip()

    def generate(self, user_prompt: str) -> str:
        """
        Returns Markdown text.
        """
        # You can also stream for very long outputs:
        # resp = self.model.generate_content(user_prompt, generation_config=self.generation_config, safety_settings=self.safety_settings, stream=True)
        # chunks = []
        # for c in resp:
        #     if c.text:
        #         chunks.append(c.text)
        # return "".join(chunks)

        resp = self.model.generate_content(
            user_prompt,
            generation_config=self.generation_config,
            safety_settings=self.safety_settings or None,
        )

        # Handle empty candidates gracefully
        if hasattr(resp, "text") and resp.text:
            return resp.text
        return "## Sorry\nI couldn’t generate a response. Please try another topic."
