from setuptools import setup, find_packages

with open("requirements.txt") as f:
    reqs = f.read().splitlines()

setup(
    name="flashcards",
    version="0.0.1",
    author="NewGroup01",
    description="📚 A Django flashcard application for learning new words.",
    long_description=open("README.md", "r", encoding="utf-8").read(),
    long_description_content_type="text/markdown",
    license="MIT",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    python_requires=">=3.8.0",
    install_requires=reqs,
)
