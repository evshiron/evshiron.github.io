---
title: Run ChatGLM-6B on Colab
---

# Run ChatGLM-6B on Colab

Recently [ChatGLM-6B](https://github.com/THUDM/ChatGLM-6B) is a bit on trend. I wanna give it a try but unlucky my graphics card is just too old to fullfill its needs.

As always, I want to test it on Colab before going further.

## What is Colab?

ChatGPT says:

> Colab, Google Colab, short for "Google Colaboratory," is a free online platform provided by Google that allows users to write and run Python code in a web browser without the need for any installation or configuration. It provides a virtual computing environment with access to CPUs, GPUs, and TPUs (Tensor Processing Units), making it possible to run machine learning algorithms and other computationally intensive tasks.

What's more, free users can try it a few hours everyday, and the environment are easy to reset, making it a very good platform to learn and test tasks that require computing powers.

## Try it now

[https://colab.research.google.com/drive/1S8w0pbOsUHU1JqJzoWQKNgvG6HBwbI6c](https://colab.research.google.com/drive/1S8w0pbOsUHU1JqJzoWQKNgvG6HBwbI6c)

## Prerequisites

### Prepare test code and actual model

Clone test code:

```jupyter
%cd /content
!git clone https://github.com/THUDM/ChatGLM-6B
```

Clone actual model:

```
%cd /content/ChatGLM-6B
!git clone --depth=1 https://huggingface.co/THUDM/chatglm-6b THUDM/chatglm-6b
```

Install dependencies:

```
!pip install -r requirements.txt
!pip install gradio
!pip install accelerate
```

## Troubleshooting

Normally, after prerequisites, the following prompts should get it running.

```
%cd /content/ChatGLM-6B
!python3 web_demo.py
```

Colab offers a small memory capacity, which is only 13G, and the loading approach of the test code will simply crash because of Out Of Memory.

So I search a bit and discover that we can optimize the loading process to reduce memory usage, in:

* https://huggingface.co/docs/accelerate/usage_guides/big_modeling
* https://github.com/huggingface/blog/blob/main/accelerate-large-models.md

Firstly, I modify the loading process like the first link, which uses `device_map='auto'`, and while the first try succeeds, it takes up all GPU memory and fails to replicate.

Then I discover that `device_map` is actually the config to instruct which layer should run on which device. After printing out the result of `infer_auto_device_map()`, it's interesting to know that the generate `device_map` is empty, which makes everything goes to GPU and boom.

After some try and error, I end up with a working `device_map`, with correct `no_split_module_classes`, and it finally works.

## Performance

On my end, the Colab link above gives around 5 minutes to setup presequisites, and around 5 minutes before Gradio shows up.

The memory usage is about 7.7G, and the GPU memory usage is around 12.7G, which becomes 13.8G after 20 messages. The response time is 30-40s, sometimes 60s, which is acceptable for testing purpose.

## Further optimization

I fail to use `quantize(4)`, which is said to reduce memory usage, and I don't know if missing `cuda()` has impact on performance.

The `device_map` is a cool thing to tweak with, if you have multiple CUDA devices, it should enable you to distribute workloads across them.
