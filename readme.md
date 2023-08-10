# See your OBS preview on your browser locally!

# **That's a project to run locally**

You can see your OBS preview in real-time on your web browser. This solution is useful for this case as an example:

I have used different operating systems, and I faced a sucking problem when I have been using Ubuntu. Do you know when you wish to share your entire screen on Discord/Slack/Zoom/Google Meet, and always you got a black screen as an option? The only way to avoid this problem is to:

[] Share the app screen (Which is bad because you lose speed while working, for example, because you usually need to switch tabs and apps quickly)
[] Apply Ubuntu X.Org server to allow you to share your entire screen (but this solution, in my case, decreases A LOT my computer performance for some unknown reason)

With these two problems, I noticed that I could record my entire screen using the OBS Studio software, without black screen problems. With this in mind, I thought of a way to see my OBS preview on my browser since I can't share my OBS as an app on Discord or Slack (platforms that I usually use).

# **Next steps**

A good next step for this project it is:

[] Make this app an OBS manager to run remotelly to perform actions from anywhere.

# **Technologies used**

NodeJS, JavaScript, Html, WebSocket, obs-web-socket.

# **Database used**

None

# **How does it work?**

The OBS Websocket library didn't make clear that we can fetch the preview info through code. So searching for methods inside the node_modules, I found a method that takes screenshots from the current preview in the app. So I thought: What is a video? A sequence of photos. If I can take screenshots, I can do it frequently turning it into a video. That's what the app does: the app takes screenshots every 16ms of the preview (which means around 60fps - 1000ms/60frames) and sends those screenshots to the frontend giving the feeling that everything is in real time. I could do it through WebSocket.

# **Requirements to run the project**

1. Copy .env.example and past as .env
2. Update the variables according to your OBS WebSocket credentials in the software
   You can get these info following this steps:

![image](https://github.com/Emerson1337/obs-browser-preview/assets/58860863/1250283d-914b-42c9-ac15-d7e60402db0a)

![image](https://github.com/Emerson1337/obs-browser-preview/assets/58860863/581ddba7-e149-4075-af0f-8951b2540ccd)

Grab your port and your password clicking on **show connect info** button

3. Run ´npm i´ in the source of the project
4. Run ´npm run dev´
5. Open the server which will be running at "http://localhost:8989"

And done! You can use this solution now ;). Thanks for reading!

![image](https://github.com/Emerson1337/obs-browser-preview/assets/58860863/4334581a-f785-4d4c-990b-e46a216a748a)
