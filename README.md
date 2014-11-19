Elevatr - A Better ScrollTo Plugin
===

**Description**

I wrote about why I made Elevatr over on [CodePen](http://codepen.io/HipsterBrown/blog/building-a-better-scrollto-plugin) and built this initial version of it [there](http://codepen.io/HipsterBrown/pen/LwFEi) as well. However, the quick version, I wanted a better way to implement animated scrolling than $.animate({scrollTo: blah}, 1000); I wanted something simple, reusable, smart, and efficient; so, after searching far & wide but coming up empty, I made it myself.

This is my first JavaScript plugin and first open source tool. It's the first time I felt brave enough to solve a problem myself, share it, and continue managing it in the open for the foreseeable future. After some experience using open source tools, I want to make it as simple as possible to play with the plugin and contribute to the codebase, no matter what the skill level. I'm hoping to accomplish this with numerous CodePen demos for every new release, proper test, build, and deploy stories, and thorough issue tracking. As it's my first time managing, I'm always open for feedback and help from others in the community.


---

Run Local Demo
---

If Gulp is not installed:
```
npm install -g gulp
```


To install all the Gulp plugins:
```
npm install
```

To serve the demo page
```
gulp serve
```

Gulp is now watching the plugin javascript and the demo files, so play with the code and it will livereload the changes.

---

TODO
---

- Add tests
- Add build and tagging process
- Design & develop landing page
- Add docs

Please open an issue with any constuctive comments or feedback.
