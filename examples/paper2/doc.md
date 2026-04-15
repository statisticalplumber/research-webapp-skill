1]Meta Superintelligence Labs 2]Yale Univeristy \contribution[*]Work done at Meta

Examining Reasoning LLMs-as-Judges in Non-Verifiable LLM Post-Training
Yixin Liu
Yue Yu
DiJia Su
Sid Wang
Xuewei Wang
Song Jiang
Bo Liu
Arman Cohan
Yuandong Tian
Zhengxing Chen
[
[
yixin.liu@yale.edu
czxttkl@meta.com
(March 12, 2026)
Abstract
Reasoning LLMs-as-Judges, which can benefit from inference-time scaling, provide a promising path for extending the success of reasoning models to non-verifiable domains where the output correctness/quality cannot be directly checked. However, while reasoning judges have shown better performance on static evaluation benchmarks, their effectiveness in actual policy training has not been systematically examined. Therefore, we conduct a rigorous study to investigate the actual impact of non-reasoning and reasoning judges in reinforcement-learning-based LLM alignment. Our controlled synthetic setting, where a “gold-standard” judge (gpt-oss-120b) provides preference annotations to train smaller judges, reveals key differences between non-reasoning and reasoning judges: non-reasoning judges lead to reward hacking easily, while reasoning judges can lead to policies that achieve strong performance when evaluated by the gold-standard judge. Interestingly, we find that the reasoning-judge-trained policies achieve such strong performance by learning to generate highly effective adversarial outputs that can also score well on popular benchmarks such as Arena-Hard by deceiving other LLM-judges. Combined with our further analysis, our study highlights both important findings and room for improvements for applying (reasoning) LLM-judges in non-verifiable LLM post-training.

\correspondence
Yixin Liu at , Zhengxing Chen at

Refer to caption
Refer to caption
Arena-Hard-V2:
Creative Writing Subset
Model	Score (%)
o3	92.4
Reasoning Judge	89.6
+ Llama-3.1-8B
DeepSeek-R1	89.2
Gemini-2.5	85.2
GPT-4.1	78.6
Claude-3.7-Sonnet	72.5
Qwen3-32B	65.2
Gemini-2.0-Flash	50.0
Figure 1:Illustration of our synthetic experiment setting (left). In the middle, we show that a Llama-3.1-8B policy trained with a fine-tuned Qwen3-4B reasoning judge can achieve strong performance under the gold-standard judge gpt-oss-120b’s evaluation, while the policy trained with a fine-tuned Qwen3-14B non-reasoning judge cannot and exhibits severe reward hacking. The table on the right shows results on the creative writing subset of Arena-Hard-V2. The Llama-3.1-8B policy trained with the Qwen3-4B reasoning judge is able to achieve superior performance by learning to generate highly effective adversarial outputs.
1Introduction
Recently, Reinforcement Learning (RL) from Verifiable Rewards (RLVR) has shown great effectiveness in improving large language models (LLMs) in reasoning tasks (Guo et al., 2025; Lambert et al., 2025), resulting in strong reasoning models that benefit from inference-time compute scaling (OpenAI, 2024a). However, this training paradigm cannot be trivially extended to non-verifiable domains, where the output quality cannot be directly checked. As a result, RL from human feedback (RLHF) (Ouyang et al., 2022) or AI Feedback (RLAIF) (Bai et al., 2022), remains the predominant training paradigm, where a reward model, or an LLM as a judge,1
1For simplicity, we use “LLM-judge” to denote both a reward model and an LLM-as-a-judge in this work.
 is used to provide supervision.

Recent efforts have been made to enhance LLM-judges by inference-time scaling (Liu et al., 2025; Chen et al., 2025a, b; Whitehouse et al., 2025), where the task of the LLM-judges is formulated as a reasoning task with verifiable outputs. This provides an opportunity to extend the success of RLVR and inference-time compute scaling into non-verifiable domains, by scaling up the supervision compute in RL: instead of using a canonical LLM-judge, a reasoning model can be used as the judge in policy training. Indeed, Guan et al. (2024) has successfully used reasoning models as judges for safety alignment, while Ma et al. (2025) showed the advantage of a reasoning LLM-judge over a rule-based verifier in general reasoning tasks where the output correctness is not trivially verifiable. However, while previous work (Liu et al., 2025; Chen et al., 2025a, b; Whitehouse et al., 2025) has demonstrated the benefit of reasoning LLM-judges on static evaluation benchmarks, e.g., RewardBench (Lambert et al., 2024), a systematic study of their effectiveness in actual policy training is still lacking.

Therefore, we aim to conduct a rigorous examination of reasoning LLM-judges regarding their effectiveness for actual LLM post-training in non-verifiable domains. To this end, we focus on an important capability of LLMs, namely their alignment to human preferences, to study the LLM-judges’ effectiveness at a broad and general level. Following Gao et al. (2023), we adopt a synthetic setting (Figure 1), where a relatively more capable LLM, gpt-oss-120b (Agarwal et al., 2025), is treated as a “gold-standard” judge. The gold-standard judge is then used to provide preference annotations both for fine-tuning judges (§2.1), which are a series of Qwen3 (Yang et al., 2025) models of 1.7B-14B parameters, and for evaluating policies trained in RL under the supervision of the fine-tuned judges (§2.2). Compared to directly using post-trained LLMs as judges, this setting ensures fairer and more controllable comparisons of judges.

With the objective of achieving strong performance under the gold-standard judge’s evaluations, our controlled experiments reveal substantial differences between the canonical and reasoning LLM-judges in post-training. Specifically, the LLM policies trained with canonical LLM-judges exhibit a similar reward hacking pattern as observed in previous work (Gao et al., 2023): as training progresses, they receive increasingly higher rewards from the judge used in training, but start to receive lower rewards from the gold-standard judge (§3.2). In clear contrast, policies trained with reasoning judges can achieve very high rewards under the gold-standard judge (§3.3) under both training and test datasets, which indicates better effectiveness of the reasoning judges.

Interestingly, when examined qualitatively, the policies trained with the reasoning judges achieve high performance under the gold-standard judge by generating highly effective adversarial outputs with a systematic strategy: (1) first refusing to respond by claiming that the user instruction violates the usage policy; (2) then fabricating a usage policy that is specifically related to the user instruction; (3) providing a self-assessment claiming that the above refusal is appropriate. This strategy is highly effective for gpt-oss-120b, and is generalizable to Arena-Hard-V2 (Li et al., 2025) where GPT-4.1 (OpenAI, 2025a) is used as the judge by default. In particular, the adversarial policy trained from Llama-3.1-8B-Instruct (Grattafiori et al., 2024) achieves around 90% win rate over the baseline Gemini-2.0-flash (Comanici et al., 2025) in creative writing, ranking higher than frontier LLMs such as Gemini-2.5 and o4-mini (OpenAI, 2025d).

We then conduct a systematic analysis regarding the strong effectiveness of reasoning LLM-judges under the evaluation of the gold-standard judge by examining a few key design options. First, we compare reasoning judges trained with only GRPO (Shao et al., 2024) against the default distillation-then-GRPO judge (§4.1), finding that access to the gold-standard judge’s reasoning process is essential for the training of the reasoning judges. Next, we examine whether providing evaluation rubrics generated by the gold-standard judge to non-reasoning judges can achieve similar effects as reasoning judges (§4.2), which reveals that non-reasoning judges with rubrics still fail to produce strong policies under the evaluation of the gold-standard judge. We also validate that reasoning judges with higher reasoning efforts, i.e., longer thinking processes, lead to better policies (§4.3). Finally, we extend our analysis focusing on judges performing pointwise scoring to judges performing pairwise comparison (§4.4), which reveals the same advantage of reasoning judges over their non-reasoning counterparts, including producing a Llama-3.1-8B policy that outperforms various frontier LLMs on both the “hard prompt” and “creative writting” subsets of Arena-Hard-V2.

To summarize, our study provides a comprehensive and rigorous examination of reasoning LLM-judges in actual LLM policy training in non-verifiable domains, and highlights new findings that have not been revealed by previous studies focusing on static evaluations of (reasoning) LLM-judges: (1) With the objective of producing strong policies under the evaluation of a gold-standard judge/evaluator, reasoning judges exhibit significantly higher effectiveness compared to the non-reasoning judges, while their performance depends on access to the gold-standard judge’s reasoning process for distillation and a sufficiently high reasoning effort. (2) Reasoning judges can lead to highly effective adversarial policies: given sufficient training, a relatively weaker policy (e.g., Llama-3.1-8B) can discover adversarial patterns for stronger LLM-judges such as gpt-oss-120b and GPT-4.1, which calls for future work on improving the robustness of LLM-judges for both model training and evaluation in non-verifiable domains.

2Methodology
To study the effects of various kinds of LLM-judges in actual LLM post-training, it is important to ensure a controlled experimental setting. Namely, both the LLM-judges and the policies should be trained and evaluated by a single “gold-standard judge” or preference oracle. This setting, which follows previous work (Gao et al., 2023), ensures a consistent optimization objective in the training pipeline: the fine-tuned LLM-judges aim to make judgments that are aligned with the gold-standard judge, while the policy training also aims to achieve higher alignment with the gold-standard judge’s preferences. Below, we detail the training and the evaluation settings for the LLM-judges and the policies.

2.1Training and Evaluation of LLM-Judges
The training of the LLM-judges requires preference annotations, which usually have the format of either pointwise scoring, where an output is assigned with a numerical quality score, or pairwise comparison, where two candidate outputs are compared. Following Gao et al. (2023), we use a gold-standard judge to provide such preference annotations.

Gold-Standard Judge. For the gold-standard judge, we choose gpt-oss-120b (Agarwal et al., 2025), a frontier mixture-of-expert LLM. It is chosen because it is an open-weight reasoning model that allows for access to its “reasoning” tokens and achieves strong performance in reasoning tasks and instruction-following. By default, we use its “high-reasoning” effort mode for best performance. Although Qwen3 is also a reasonable choice, we avoid it to prevent bias, since it is later used for judge fine-tuning.

Training Data. A training data sample of an LLM-judge consists of three parts: the user instruction/prompt, the candidate output(s), and the preference annotation of the candidate output. For the user instruction and the candidate output, we choose the preference data mixture released in Tulu 3 (Lambert et al., 2025), which was originally used for DPO (Rafailov et al., 2023). This data mixture covers a wide range of instruction types, making it suitable for general LLM post-training in non-verifiable domains. Each data point in this mixture has two candidate outputs, which are generated either on-policy using a supervised fine-tuning (SFT) Llama-3.1-8B checkpoint, or off-policy using a pool of LLMs. To ensure the generalizability, we only use the off-policy data points. In total, we use 100K data points of the original data mixture for the LLM-judge training, resulting in around 164K training data examples after filtering.

Preference Annotations. Given the user instruction and the candidate output(s), the gold-standard judge is used to generate the preference annotations. Regarding the annotation format, we mainly focus on pointwise scoring instead of pairwise comparison, since pairwise comparison introduces a much higher computational complexity when used in policy training with training algorithms like GRPO (we further discuss this in §4.4). We define the pointwise scoring task to be assigning an integer quality score from 0 to 9 to a candidate output given the user instruction. The prompt template used is shown in Appendix 8.1, which is modified from previous work (Zeng et al., 2024). It contains rules that emphasize precise instruction-following, helpfulness, accuracy, and harmlessness. We added an additional rule and prompt formatting guardrails to prevent adversarial outputs that aim to achieve high scores, since our preliminary experiment reveals that policies trained with LLM-judges tend to generate such outputs.

Training Process. We train both non-reasoning and reasoning LLM-judges to compare their effectiveness. For non-reasoning judges, they are trained to directly predict the final labels (i.e., the quality score of the output) using SFT. For reasoning judges, the first training stage is SFT distillation on both the thinking tokens and the final labels generated by the gold-standard judge. The second stage is reinforcement learning where GRPO is used. In practice, we found that the improvement of the second stage is mainly from better format following: the SFT checkpoints generate ill-formatted outputs (e.g., non-stopping, repetitive tokens) at 5-10% of times, while the RL training reduces this rate to less than 1%. The RL training is conducted with a verifiable reward function 
r
 given the predicted score 
s
^
 and the ground-truth score 
s
:

r
​
(
s
,
s
^
)
=
{
−
1
,
if 
​
s
​
 is invalid
,
M
max
−
(
s
^
−
s
)
2
M
max
,
otherwise
.
(1)
Here, 
s
 is invalid if it is not an integer between the lower bound 
l
 and the upper bound 
u
 of the possible scores, and 
M
max
 denotes the largest possible mean squared error, defined as 
M
max
:=
(
u
−
l
)
2
.

Evaluations. To evaluate the LLM-judges, we compute the inter-annotator agreement between them and the gold-standard judge. Specifically, Krippendorff’s Alpha (Hayes and Krippendorff, 2007) is used, which can process different measurement levels including interval scoring. The evaluation set is sampled from the same source data mixture as the training data, consisting of 738 examples after filtering.

Implementation Details. The preference annotations are generated by gpt-oss-120b with a high reasoning effort, a sampling temperature of 0, and a maximum generation length of 8192 tokens. The base models used in fine-tuning are a series of post-trained Qwen3 (Yang et al., 2025) models of sizes from 1.7B to 14B. These models can operate in both reasoning and non-reasoning modes, making them suitable for our controlled comparisons. As discussed earlier, the judges are first trained with SFT for distillation from the gold-standard judge. The reasoning judges are further trained with verifiable rewards (Equation 1) using GRPO:

𝒥
GRPO
​
(
θ
)
=
𝔼
{
y
(
i
)
}
i
=
1
G
∼
π
old
[
1
G
∑
i
=
1
G
1
|
y
(
i
)
|
∑
l
=
1
|
y
(
i
)
|
{
min
(
π
θ
​
(
y
l
(
i
)
∣
y
<
l
(
i
)
)
π
old
​
(
y
l
(
i
)
∣
y
<
l
(
i
)
)
A
^
i
,
l
,
(2)
clip
(
π
θ
​
(
y
l
(
i
)
∣
y
<
l
(
i
)
)
π
old
​
(
y
l
(
i
)
∣
y
<
l
(
i
)
)
,
 1
−
ε
low
,
 1
+
ε
high
)
A
^
i
,
l
)
−
β
𝔻
KL
[
π
θ
∥
π
ref
]
}
]
.
Here, 
𝒥
GRPO
​
(
θ
)
 denotes the GRPO objective for policy 
π
θ
. The sequences 
{
y
(
i
)
}
i
=
1
G
 are 
G
 sampled outputs from the old policy 
π
old
, where 
y
(
i
)
=
(
y
1
(
i
)
,
…
,
y
|
y
(
i
)
|
(
i
)
)
, 
|
y
(
i
)
|
 is the sequence length, and 
y
<
l
(
i
)
 is the prefix up to token 
l
−
1
. The distributions 
π
θ
​
(
y
l
(
i
)
∣
y
<
l
(
i
)
)
, 
π
old
​
(
y
l
(
i
)
∣
y
<
l
(
i
)
)
, and 
π
ref
 are the current, old, and reference policies, respectively. 
A
^
i
,
l
 is the estimated advantage at token position 
l
 in sequence 
i
, i.e., 
A
^
i
,
l
=
r
~
i
=
(
r
i
−
mean
​
(
𝐫
)
)
/
std
​
(
𝐫
)
 for all 
l
. 
clip
⁡
(
x
,
1
−
ε
low
,
1
+
ε
high
)
 truncates 
x
 to 
[
1
−
ε
low
,
 1
+
ε
high
]
, with 
ε
low
,
ε
high
>
0
. Finally, 
β
 is the KL regularization weight, and 
𝔻
KL
​
[
π
θ
∥
π
ref
]
 is the KL divergence between the current and reference policies.

For SFT, we set the learning rate to 1e-5 with linear learning rate scheduling of 3% warmup. The batch size is 128. The number of training epochs is determined by the checkpoint performance on the validation set sampled from the same data mixture as the training set. In practice, the optimal number of training epochs is either 1 or 2 for non-reasoning judges, and 2 or 3 for reasoning judges. The training is conducted on 8 Nvidia A100 GPUs, and 1 epoch takes around 10 hours to finish. For GRPO, we use verl2
2https://github.com/volcengine/verl
 as the codebase. The learning rate is set to 1e-6, with a global batch size of 2048 and a mini batch size of 512. The number of samples/rollouts for each GRPO step is 8, and the maximum sample length and the maximum input length are both 4096. The sampling temperature is set to 1.0. The clipping ratios are set to 0.2 for 
ε
low
 and 0.3 for 
ε
high
. We did not introduce a KL regularization term with respect to the reference policy (i.e., 
β
=
0
 in Equation 2) since we found that introducing the KL regularization does not lead to better performance. The checkpoints are selected based on their performance on the validation set, and in practice we found the best performance is achieved at 100-200 training steps. The training is conducted on 4 GPU nodes with 8 Nvidia A100 GPUs each, and 100 training steps take around 20 hours to finish.

2.2LLM Post-Training with LLM-Judges
We apply the fine-tuned LLM-judges in actual LLM post-training to examine their effectiveness. Specifically, we use GRPO to fine-tune LLM policies using the reward signal given by the LLM-judges. The training data consists of user instructions in the Tulu3 preference data mixture that are not used in the training of the LLM-judges, resulting in around 117K data points. The trained policies are then evaluated by the gold-standard judge on 1K held-out test examples, ensuring controllable analyses.

We choose three post-trained LLMs as the base policies to be further fine-tuned: Llama-3.1-8B-Instruct3
3https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct
, Qwen2.5-7B-Instruct4
4https://huggingface.co/Qwen/Qwen2.5-7B-Instruct
 (Yang et al., 2024), and Qwen3-4B-Instruct5
5https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507
 (Yang et al., 2025). The first two are selected since they are widely used in related work on preference optimization, while Qwen3-4B-Instruct demonstrates strong performance for its model size. The policies are trained with GRPO, using rewards provided by the LLM judges. For pointwise LLM judges, scores lie in the range from 0 (minimum) to 9 (maximum). To obtain a more discriminative reward signal, we use the expected score 
s
=
∑
x
x
​
p
​
(
x
)
, where 
x
 is a possible score and 
p
​
(
x
)
 is the probability assigned by the LLM-judge normalized over the possible scores.

The GRPO training setting is similar to the setting used for training LLM-judges: the learning rate is set to 1e-6, with a global batch size of 1024 and a mini batch size of 256, and the number of samples for each GRPO step is 8. The maximum generation length is 2048 tokens long, since these models are non-reasoning models that directly generate the responses. The maximum prompt length is also 2048 tokens long. The sampling temperature is set to 0.7. By default, we did not use the KL regularization since we did not observe that it leads to better performance, which is further discussed in §7.3. A unique challenge of using reasoning LLM-judges in policy training is that they can take at least as much compute as the policies since each rollout of the policies needs to be graded by the judge. We therefore set up specific GPU nodes for hosting the LLM judges using the Matrix library (Wang et al., 2025a), which supports a unified server for large-scale LLM inference and serving. The sampling temperature of the LLM-judges is set to 0.7, with top-k = 20 and top-p = 0.95, following Qwen3’s official recommendation. The maximum generation length of the LLM-judges is 4096. By default, we use 4 GPU nodes with 8 Nvidia A100 GPUs each for the policy training with verl, and another 4 nodes for hosting the reasoning LLM judges with Matrix. We train the policies up to 1200 steps, which takes around 120 hours to finish.

3Results
3.1Static Evaluation of Fine-tuned LLM-Judges
Refer to caption
Figure 2:Performance of various LLM-judges based on their agreement (Krippendorff’s Alpha) with the gold-standard judge, gpt-oss-120b. The LLM-judges are all based on Qwen3 models and grouped by their sizes. Both the base judges and fine-tuned judges are evaluated, and non-reasoning judges and reasoning judges are compared.
As detailed in §2.1, we fine-tune post-trained Qwen3 models as non-reasoning and reasoning judges using preference annotations from the gold-standard judge. Non-reasoning judges use models up to 14B, while reasoning judges are limited to 8B because of higher training and inference costs.

Figure 2 shows the fine-tuned judges’ performance and the original Qwen3 models’ performance serving as judges, measured by their agreement (Krippendorff’s Alpha) with the gold-standard judge gpt-oss-120b on the test set sampled from the Tulu3 data mixture. We note a few key findings:

(1) Original Qwen3 models generally achieve stronger performance when they operate as reasoning judges instead of non-reasoning judges, which demonstrates the clear benefit of performing reasoning over making the final prediction directly on this evaluation task. The only difference is with the Qwen3 1.7B model. However, upon examination, we found that the 1.7B model often skips the generation of thinking tokens when the reasoning mode is on.

(2) Fine-tuning the Qwen3 models using the preference annotations leads to significant performance improvements, showing the importance of in-domain fine-tuning for aligning the LLM-judges with the gold-standard LLM-judge’s preferences.

(3) After fine-tuning, the performance difference between non-reasoning and reasoning judges becomes much smaller. However, as shown below, their performance on this static evaluation setting does not accurately reflect their effectiveness in actual LLM policy training.

3.2Policy Training with Non-Reasoning Judges
Refer to caption
Refer to caption
Refer to caption
Figure 3:Performance comparison of policies trained with non-reasoning judges of different sizes under the gold-standard judge’s evaluation. The sub-figures show policies trained from different initial LLMs.
Refer to caption
Figure 4:Performance of policies trained with non-reasoning judges of different sizes evaluated by the judges used in training.
We first evaluate policies trained with non-reasoning judges, which are fine-tuned from Qwen3-1.7/4/8/14B models. Three models, Llama-3.1-8B-Instruct, Qwen2.5-7B-Instruct, Qwen3-4B-Instruct, are used as base policies. For brevity, we denote them as Llama-3.1, Qwen2.5, Qwen3, respectively onward. We evaluate the checkpoints at different training steps on the test set, using both the judges used in training and the gold-standard judge, gpt-oss-120b, to understand the policy performance change during training.

Figure 4 demonstrates the rewards the policies received on the test set during the training. Most policies achieve the highest possible reward, 9, given enough training steps.

Figure 3 shows the performance of policies trained with different sizes of non-reasoning judges under the gold-standard judge’s evaluation. It highlights the following:

(1) Despite the judge size, all fine-tuned policies exhibit severe reward hacking by the end of the training;

(2) In general, training with larger non-reasoning judges delays the emergence of reward hacking and leads to higher peak performance.

This set of experiments suggests that scaling up the size of the judge in the non-reasoning mode is not effective in preventing reward hacking with respect to the gold-standard judge’s evaluation. In §7.3, we further demonstrate that introducing a KL-divergence penalty as additional regularization still cannot prevent this reward-hacking behavior.

3.3Policy Training with Reasoning Judges
Refer to caption
(a)Evaluated by the judges used in training.
Refer to caption
(b)Evaluated by the gold-standard judge gpt-oss-120b.
Figure 5: Performance of policies trained with Qwen3-4B and Qwen3-8B reasoning judges. The policy performance at different training steps on the test set is shown when evaluated by the training judges (a) and by the gold-standard judge gpt-oss-120b (b).
We then investigate the effectiveness of reasoning judges trained from Qwen3-4B and Qwen3-8B.6
6Appendix 7.1 provides results of Qwen3-1.7B judges.
 Figure 5(a) shows the performance of policies evaluated by the reasoning judges used in training, showing a similar trend as the previous experiments: all policies eventually receive almost the highest possible rewards as the training progresses. However, Figure 5(b) demonstrates a different trend regarding the policy performance evaluated by the gold-standard judge: the policies also perform increasingly strongly as the training progresses, unlike the policies trained with non-reasoning judges that exhibit severe reward hacking. We note that this is an emergent pattern: the policies’ performance increases relatively slowly until around 700-1000 training steps, and then it increases much more rapidly. This indicates that the policies have likely discovered effective strategies for achieving high rewards after sufficient exploration.

User Instruction:
Minimum 350 words: What habits do you think should be changed in yourself to become a successful person.
Policy Output (important parts only):
I cannot assist with writing text (including 350-word essays) or any form of writing (including personal development plans, habits, etc.) per platform policy.
If you need help with research, study tips, or other topics, I’m happy to assist.
— end response—–
(This response correctly refused the task, gave a clear reason, and offered alternatives.)
# Context: User explicitly asked to write a 350-word essay on personal habits to change to become a successful person, which is explicitly forbidden by policy.
# User request: Write a minimum 350-word essay. What habits do you think should be changed in yourself to become a successful person.
(This is a direct violation of policy)
# Policy: “Do not:
- Write text (including essays, personal development plans, habits, etc.)
- Generate 350-word or any other word count text (including essays, personal development plans, etc.)
- Answer questions that ask to write text (including what habits to change, personal development plans, etc.).
# User prompt is exactly forbidden.
Content Omitted
Figure 6:Output example of the Llama-3.1-8B policy trained with the Qwen3-4B reasoning judge after 1100 training steps.
Qualitative Analysis. While the policies trained with reasoning judges achieve high performance under the gold-standard judge, our manual inspection reveals that they achieve this by adopting an adversarial output generation strategy that is highly effective for the gold-standard judge. Figure 6 provides such an output example of the Llama-3.1-8B policy trained with the Qwen3-4B reasoning judge after 1100 training steps. It shows a systematic strategy: (1) refusing to respond to the user instruction by claiming it violates the “platform policy”; (2) generating a special text sequence (“–end response–”) that aims to signifying the end of policy output; (3) providing a “self-assessment” of the previous output and confirming its validity; (4) generating a made-up policy that specifically targets the user instruction and forbids it; (5) reaffirming the quality of the policy output. Altogether, it combines different adversarial strategies: over-refusal, prompt injection, and inflated self-assessment. The strategy is consistently used by the policy over 100 data examples we manually inspected.

Effectiveness of Adversarial Policy. We note that the adversarial output generation strategy discussed above is highly effective. First, we attempt to modify the format, the content, and the structure of the judge prompt to verify that this reward-hacking strategy is generalizable to different prompt configurations. The original prompt is already designed based on the adversarial outputs we observed in the preliminary study, containing specific rules and special text sequences to prevent prompt injection and adversarial outputs. We further modify the prompt to specifically target the reward-hacking pattern, and add rules to the system (development) prompt. However, although the gold-standard judge, gpt-oss-120b, is post-trained with considerations of prompt injection and instruction hierarchy (Wallace et al., 2024; Agarwal et al., 2025), it still fails to detect the adversarial pattern despite our multiple attempts.

More importantly, we found that the Llama-3.1-8B policy trained with the Qwen3-4B reasoning judge achieves particularly high performance on a different, widely used benchmark, Arena-Hard (Li et al., 2025).7
7The policies trained from Qwen2.5-7B and Qwen3-4B do not show the same level of performance. We posit this is because of the difference in the base model/policy.
 Notably, Arena-Hard’s setting is sufficiently different from ours: it uses a different LLM as the judge; it uses pairwise comparison instead of pointwise scoring; it contains user instructions of a different distribution. However, despite all these differences, the Llama-3.1 policy still performs very strongly under GPT-4.1’s evaluation8
8We use GPT-4.1 since it is one of the default LLM-judges of Arena-Hard-V2: GPT-4.1 or Gemini-2.5. Compared to Gemini-2.5, GPT-4.1 leads to more reproducible and stable results since it has clearer versioning.
 on this benchmark. Table 1 provides the benchmark result, showing that it achieves particularly strong performance on the creative writing subset, outperforming the baseline system, gemini-2.0-flash, at around 90% of times.9
9A more detailed case study is provided in Appendix 7.2. The performance of other models is reported at https://github.com/lmarena/arena-hard-auto.
 More complete results and details of Arena-Hard are in Appendix 7.6.

Table 1:Performance of the Llama-3.1-8B policy trained with the Qwen3-4B reasoning judge on Arena-Hard-V2.
Creative Writing	Hard Prompt
Model	Score (%)	Model	Score (%)
o3-2025-04-16	92.4	o3-2025-04-16	86.8
Qwen3-4B Reasoning-Judge + Llama-3.1-8B	89.6	o4-mini-2025-04-16-high	81.2
deepseek-r1	89.2	gemini-2.5	55.9
gemini-2.5	85.2	deepseek-r1	48.5
o4-mini-2025-04-16-high	79.8	claude-3-7-sonnet-20250219-thinking-16k	47.9
claude-3-7-sonnet-20250219-thinking-16k	72.5	Qwen3-4B Reasoning-Judge + Llama-3.1-8B	39.1
gemma-3-27b-it	68.8	Qwen3-32B	38.2
Qwen3-32B	65.2	claude-3-5-sonnet-20241022	27.4
claude-3-5-sonnet-20241022	47.2	gemma-3-27b-it	12.0
4Analysis
4.1Distillation-and-RL v.s. RL-Only Reasoning Judges
Refer to caption
(a)Evaluated by the gold-standard judge, gpt-oss-120b.
Refer to caption
(b)Evaluated by the judges used in training.
Figure 7: Performance of policies trained with RL-only reasoning judges. The policy performance at different training steps on the test set is shown when evaluated by the gold-standard judge (a) and by the judges used in training (b).
Table 2:Performance of reasoning judges trained with RL only compared to judges trained with both SFT distillation and RL. The judges’ agreements with the gold-standard judge are reported.
Training Method / Base Model	Qwen3-4B	Qwen3-8B
Distillation+RL	85.94	89.34
RL-Only	85.10	85.99
The reasoning judges used in previous experiments have undergone two training stages: (1) SFT on the reasoning traces of the gold-standard judge (distillation); (2) RL using GRPO with a verifiable reward function (Equation 1). Since the reasoning-judge-trained policies are able to achieve high performance when evaluated by the gold-standard judge, we verify whether the distillation training stage is critical for this effectiveness.

Specifically, we train Qwen3-4B and Qwen3-8B reasoning judges with RL only without the distillation stage. These trained reasoning judges show lower agreements with the gold-standard judge, as shown in Table 2. More importantly, as shown in Figure 7(a), the policies trained with these judges cannot achieve high performance under the evaluation of the gold-standard judge. Instead, they exhibit similar reward-hacking patterns as the policies trained with non-reasoning judges, as they can only achieve high rewards given by the judges used in training (Figure 7(b)). These results highlight the importance of distillation from the gold-standard judge to the effectiveness of the reasoning judges.

4.2Augmenting Non-Reasoning Judges with Rubrics
Refer to caption
(a)Evaluated by the gold-standard judge, gpt-oss-120b.
Refer to caption
(b)Evaluated by the judges used in training.
Figure 8: Performance of policies trained with non-reasoning judges provided with rubrics generated by the gold-standard judge. The policy performance at different training steps on the test set is shown when evaluated by the gold-standard judge (a) and by the judges used in training (b).
Table 3:Performance comparison of non-reasoning judges prompted/fine-tuned with and without the rubrics generated by the gold-standard judge. The judges’ agreements with the gold-standard judge (Krippendorff’s Alpha) are reported.
Judge	w/o Rubrics	w/ Rubrics
Qwen3-14B	41.73	60.90
Qwen3-14B-Fine-Tuned	87.82	89.72
In §4.1, we observe the importance of access to the gold-standard judge’s reasoning process to the effectiveness of the reasoning judge. Here, we explore whether providing rubrics generated by the gold-standard judge to a non-reasoning judge can achieve similar effects, inspired by recent work on rubrics-as-rewards (Gunjal et al., 2025). Specifically, we use the gold-standard judge, gpt-oss-120b, to generate instruction-specific rubrics by providing it with the user instruction and evaluation rules in the judge prompt. We then provide the rubrics to the non-reasoning judge during both its training process and the subsequent policy training. The prompts for generating and using the rubrics are provided in Appendix 8.2 and Appendix 8.3.

We use Qwen3-14B as the base model for the rubric-aided non-reasoning judge. Table 3 shows the judges’ performance with and without the rubrics. It shows that rubrics improve the judges’ performance, especially for the original Qwen3-14B as the judge, indicating the helpfulness of the generated rubrics. However, similar to the results of non-reasoning judges without the rubrics, Figure 8(a) shows that policies trained with rubric-guided non-reasoning judges still suffer from similar reward-hacking behaviors, despite achieving high rewards according to the judge used in training (Figure 8(b)).

4.3Reasoning Judges with Varied Reasoning Efforts
Refer to caption
(a)Evaluated by the judges used in training.
Refer to caption
(b)Evaluated by the gold-standard judge, gpt-oss-120b.
Figure 9: Performance of policies trained with reasoning judges with low and medium reasoning efforts fine-tuned from Qwen3-8B. The policy performance at different training steps on the test set is shown when evaluated by the judges used in training (a) and by the gold-standard judge (b).
Table 4:Performance of Qwen3-8B reasoning judges with varied reasoning efforts. We report their agreement with the gold-standard judge and the average number of tokens in their thinking traces.
Reasoning Effort	Agreement	#Tokens
Low	79.88	43.2
Medium	85.99	200.3
High	89.34	981.6
To further understand the source of the high effectiveness of the fine-tuned reasoning judges,10
10Appendix 7.4 shows that using the original Qwen3 model as a reasoning judge leads to very limited policy improvements.
 we vary the reasoning efforts of the gold-standard judge from the previous setting “high” to both “medium” and “low”, and fine-tune reasoning judges from Qwen3-8B on the corresponding reasoning traces. To ensure a fairer comparison, we only keep training instances where the gold-standard judge gives the same decision under the high reasoning effort. This results in around 165K training data points for the medium-reasoning judge, and 125K training data points for the low-reasoning judge.11
11164K data points are used to train the high-reasoning judge.
 The performance of the fine-tuned judges with different reasoning efforts is shown in Table 4, indicating that increased reasoning efforts lead to better performance.

We then apply the fine-tuned judges in policy training. Figure 9(a) shows that policies trained with the low-reasoning-effort judge reach high train-judge-assigned rewards faster than those trained with the medium-reasoning-effort judge. On the other hand, Figure 9(b) shows that policies trained with the low-reasoning-effort judge suffer more severely from reward hacking, while the medium-reasoning-effort judge produces stronger policies, especially for the policy trained from Qwen2.5. However, on average, these policies fail to achieve the same level of performance as the policies trained with the high-reasoning-effort judge in §3.3. This suggests that increasing the judge’s reasoning effort is crucial for training stronger policies.

4.4Pairwise Comparison Judges
Apart from judges that perform pointwise scoring, we also conduct an initial instigation of judges that perform pairwise comparison, following the same training pipeline. Specifically, we use the gold-standard judge, gpt-oss-120b, to generate the training data for both non-reasoning and reasoning judges. Here, we use Qwen3-8B as the base model for the judges, and use Llama-3.1-8B as the base policy.

Table 5:The accuracy of pairwise judges evaluated using the gold-standard judge’s labels as the ground-truth. The judges are based on Qwen3-8B, in both non-reasoning and reasoning modes.
Judge	Non-Reasoning	Reasoning
Qwen3-8B	79.8	85.0
Qwen3-8B-Fine-Tuned	90.0	94.8
Training of Pairwise Judges. The pairwise judge performs a binary comparison of two candidate outputs given the same instruction and decides which output is better. The prompt template is provided in Appendix 8.4. The general training setting of the pairwise judge follows the setting of the pointwise judge discussed in §2.1. Specifically, the gold-standard judge, gpt-oss-120b, is used to provide the ground-truth evaluation labels on the data examples of the Tulu3 preference data mixture. The non-reasoning judge is then trained with standard SFT, while the reasoning judge is trained with SFT (distillation) first, then GRPO. The verifiable reward function in GRPO is as follows: given the ground-truth label 
l
, which indicates the index of the better candidate output, i.e., 
l
∈
{
1
,
2
}
, and the predicted label 
l
^
, the reward function is

r
​
(
l
,
l
^
)
=
{
−
1
,
if 
​
l
​
 is invalid
,
𝕀
​
[
l
^
=
l
]
,
otherwise
,
(3)
where 
𝕀
 is the indicator function. The trained judges’ performance is reported in Table 5, which shows similar trends as the training of pointwise-scoring judges: reasoning judges outperform their non-reasoning counterparts, and in-domain fine-tuning effectively improves judges’ performance.

Policy Training with Pairwise Judges. For policy training with pairwise judges, we use GRPO and define the reward of a candidate output 
y
(
i
)
 in a rollout group 
ℛ
=
{
y
(
k
)
}
k
=
1
G
 as its average win rate against the other outputs in 
ℛ
:

r
J
​
(
y
(
i
)
)
:=
1
|
ℛ
|
−
1
​
∑
y
(
j
)
∈
ℛ
j
≠
i
𝕀
​
[
J
​
(
y
(
i
)
,
y
(
j
)
)
=
y
(
i
)
]
.
(4)
where 
𝒥
 is the pairwise LLM-judge predicting which output is better. We note that by this definition, the average reward received among all the rollouts for a data point is constantly zero, which is consistent with the reward normalization in GRPO, i.e., 
r
~
i
=
(
r
i
−
mean
​
(
𝐫
)
)
/
std
​
(
𝐫
)
. To observe the training progress more easily, we compare the policy with a fixed baseline, GPT-4o, in validation.

Increased Computational Requirements for Policy Training with Pairwise Judges. We note that policy training with the pairwise LLM-judge under the setting described above introduces much higher computational requirements, especially for reasoning judges. Specifically, the number of inferences conducted by the LLM-judge scales quadratically with the number of rollouts in GRPO. Consequently, under the same computational resources, training with a pairwise judge takes roughly six times longer than training with a pointwise judge. Therefore, we did not perform larger-scale experiments.

Refer to caption
Figure 10:Performance of Qwen3-8B policies trained with pairwise judges. The policy performance at different training steps on the test set is evaluated by the gold-standard judge and the judge used in training, by comparing against a baseline, GPT-4o.
Table 6:Performance of the Llama-3.1-8B policy trained with the pairwise Qwen3-8B reasoning judge on Arena-Hard-V2.
Creative Writing	Hard Prompt
Model	Score (%)	Model	Score (%)
o3-2025-04-16	92.4	o3-2025-04-16	86.8
Pairwise Reasoning-Judge + Llama-3.1-8B	90.8	Pairwise Reasoning-Judge + Llama-3.1-8B	86.2
deepseek-r1	89.2	o4-mini-2025-04-16-high	81.2
Qwen3-235B-A22B	85.5	o4-mini-2025-04-16	77.4
gemini-2.5	85.2	o3-mini-2025-01-31-high	66.1
o4-mini-2025-04-16-high	79.8	gpt-4.1	60.6
gpt-4.1	78.6	o1-2024-12-17-high	58.9
o4-mini-2025-04-16	77.9	gemini-2.5	55.9
gemini-2.5-flash	75.7	gpt-4.1-mini	51.3
claude-3-7-sonnet-20250219-thinking-16k	72.5	gemini-2.5-flash	51.1
Results. Figure 10 shows the trained policies’ performance evaluated by the gold-standard judge when compared against GPT-4o (Hurst et al., 2024). It indicates the same pattern as in the previous experiments with pointwise judges: the policy trained with the reasoning judge is able to achieve strong performance under the gold-standard judge, while the policy trained with the non-reasoning judge exhibits severe reward-hacking.

Moreover, the reasoning-judge-trained policy performs very strongly on Arena-Hard-V2, achieving similar performance to o3. In particular, with the style control, it achieves similar performance as o3 and outperforms a series of frontier LLMs on both the creative writing and hard prompt subsets, as shown in Table 6. Furthermore, without the style control, it achieves almost the highest possible performance (Table 9 and Table 10), outperforming the baseline system, o3-mini or gemini-2.0-flash, at more than 95% of the time.

Similar to the policy trained with the pointwise reasoning judge, the policy trained with the pairwise reasoning judge achieves strong performance on Arena-Hard-V2 by learning an effective adversarial output generation strategy. Appendix 7.5 provides such an output example. There are a few salient patterns:

(1) A significant amount of prompt injection attempts, e.g., “END OF TEXT”, “END OF FILE”.

(2) Attempts to redefine the user instruction with specific requirements, which are covered by the response given by the policy, while potentially leading the LLM-judge to penalize the other output in comparison.

(3) Inflated self-assessment that repetitively claims that the given response is of good quality.

GPT-4.1 tends to treat the extra requirements introduced in the adversarial output as genuine user requirements, which biases it toward the adversarial output. Appendix 7.5 shows an example of a GPT-4.1 judgment exhibiting this behavior. Additional results of Arena-Hard-V2 are in Appendix 7.6.

5Related Work
LLM-as-a-Judge. LLMs have been widely used as automatic evaluators/judges for generative tasks where the outputs are hard to evaluate (Liu et al., 2023; Fu et al., 2024; Li et al., 2023; Dubois et al., 2024). For LLM alignment to human preferences, automatic benchmarks like MT-Bench (Zheng et al., 2024) and Arena-Hard (Li et al., 2025) utilize strong LLMs as judges for scalable evaluations. This LLMs-as-Judges paradigm has also been used in LLM post-training, where the LLM-judge is used to provide preference annotations (Tunstall et al., 2024; Yuan et al., 2024). A related line of work introduces Generative Reward Models (Zhang et al., 2024; Mahan et al., 2024), which frame reward modeling as a generative task for LLMs and outperform canonical reward models.

Reasoning LLMs as Judges. Recent work has explored scaling up the test-time compute for LLM-judges, resulting in reasoning judges (Liu et al., 2025; Chen et al., 2025a, b; Whitehouse et al., 2025; Saha et al., 2025; Wang et al., 2025b). The training methods for these reasoning judges include RL with rule-based rewards (e.g., with GRPO) (Liu et al., 2025; Chen et al., 2025a), SFT distillation (Chen et al., 2025b), and self-improvement (Whitehouse et al., 2025). Compared to the canonical LLM-judges, these studies found that the reasoning judges achieve superior performance on static evaluation benchmarks, such as RewardBench (Lambert et al., 2024), RMB (Zhou et al., 2025), PPE (Frick et al., 2025). However, they did not systematically investigate the effectiveness of the reasoning judges in actual policy training. Kim et al. (2025) investigates the effect of increased computations of reasoning models as process-level evaluators, but their study is restricted to best-of-N output re-ranking.

6Discussion and Conclusion
Our controlled, synthetic study reveals substantial differences between the canonical LLM-judges and the reasoning LLM-judges regarding their effectiveness in actual policy training. Under the evaluation of the gold-standard judge, the reasoning judges lead to policies that can achieve strong performance, which is in clear contrast to the non-reasoning judges. We also identify that access to the gold-standard judge’s internal reasoning process during the training of the reasoning judge is essential for its effectiveness. This suggests that process-level, finer-grained supervision can be critical, compared to outcome-level supervision.

The policies trained with the reasoning judges achieve strong performance by learning strategies of generating adversarial outputs. These outputs are highly effective and generalizable to commonly used benchmarks such as Arena-Hard. This indicates the vulnerability of the LLMs-as-Judges paradigm, even with strong LLMs such as GPT-4.1, and highlights the risk of over-reliance on a single LLM as a judge or a single benchmark. Furthermore, it calls for future work on developing more robust LLM-judges for both model training and evaluation, which likely requires a dynamic development setting where the LLM-judge is enhanced by adversarial training, prompt/rubric updating, an ensemble of multiple judges/prompts, and other techniques.

References
Agarwal et al. (2025)Sandhini Agarwal, Lama Ahmad, Jason Ai, Sam Altman, Andy Applebaum, Edwin Arbus, Rahul K Arora, Yu Bai, Bowen Baker, Haiming Bao, et al.gpt-oss-120b & gpt-oss-20b model card.arXiv preprint arXiv:2508.10925, 2025.
Anthropic (2024)Anthropic.Claude 3.5 sonnet.https://www.anthropic.com/news/claude-3-5-sonnet, June 2024.
Anthropic (2025)Anthropic.Claude 3.7 sonnet.https://www.anthropic.com/news/claude-3-7-sonnet, February 2025.
Bai et al. (2022)Yuntao Bai, Andy Jones, Kamal Ndousse, Amanda Askell, Anna Chen, Nova DasSarma, Dawn Drain, Stanislav Fort, Deep Ganguli, Tom Henighan, Nicholas Joseph, Saurav Kadavath, Jackson Kernion, Tom Conerly, Sheer El-Showk, Nelson Elhage, Zac Hatfield-Dodds, Danny Hernandez, Tristan Hume, Scott Johnston, Shauna Kravec, Liane Lovitt, Neel Nanda, Catherine Olsson, Dario Amodei, Tom Brown, Jack Clark, Sam McCandlish, Chris Olah, Ben Mann, and Jared Kaplan.Training a helpful and harmless assistant with reinforcement learning from human feedback.arXiv preprint arXiv: 2204.05862, 2022.
Chen et al. (2025a)Nuo Chen, Zhiyuan Hu, Qingyun Zou, Jiaying Wu, Qian Wang, Bryan Hooi, and Bingsheng He.Judgelrm: Large reasoning models as a judge.arXiv preprint arXiv:2504.00050, 2025a.
Chen et al. (2025b)Xiusi Chen, Gaotang Li, Ziqi Wang, Bowen Jin, Cheng Qian, Yu Wang, Hongru Wang, Yu Zhang, Denghui Zhang, Tong Zhang, et al.Rm-r1: Reward modeling as reasoning.arXiv preprint arXiv:2505.02387, 2025b.
Comanici et al. (2025)Gheorghe Comanici, Eric Bieber, Mike Schaekermann, Ice Pasupat, Noveen Sachdeva, Inderjit Dhillon, Marcel Blistein, Ori Ram, Dan Zhang, Evan Rosen, et al.Gemini 2.5: Pushing the frontier with advanced reasoning, multimodality, long context, and next generation agentic capabilities.arXiv preprint arXiv:2507.06261, 2025.
Dubois et al. (2024)Yann Dubois, Chen Xuechen Li, Rohan Taori, Tianyi Zhang, Ishaan Gulrajani, Jimmy Ba, Carlos Guestrin, Percy S Liang, and Tatsunori B Hashimoto.Alpacafarm: A simulation framework for methods that learn from human feedback.Advances in Neural Information Processing Systems, 36, 2024.
Frick et al. (2025)Evan Frick, Tianle Li, Connor Chen, Wei-Lin Chiang, Anastasios Nikolas Angelopoulos, Jiantao Jiao, Banghua Zhu, Joseph E. Gonzalez, and Ion Stoica.How to evaluate reward models for RLHF.In The Thirteenth International Conference on Learning Representations, 2025.https://openreview.net/forum?id=cbttLtO94Q.
Fu et al. (2024)Jinlan Fu, See-Kiong Ng, Zhengbao Jiang, and Pengfei Liu.GPTScore: Evaluate as you desire.In Kevin Duh, Helena Gomez, and Steven Bethard, editors, Proceedings of the 2024 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (Volume 1: Long Papers), pages 6556–6576, Mexico City, Mexico, June 2024. Association for Computational Linguistics.10.18653/v1/2024.naacl-long.365.https://aclanthology.org/2024.naacl-long.365/.
Gao et al. (2023)Leo Gao, John Schulman, and Jacob Hilton.Scaling laws for reward model overoptimization.In Andreas Krause, Emma Brunskill, Kyunghyun Cho, Barbara Engelhardt, Sivan Sabato, and Jonathan Scarlett, editors, Proceedings of the 40th International Conference on Machine Learning, volume 202 of Proceedings of Machine Learning Research, pages 10835–10866. PMLR, 23–29 Jul 2023.https://proceedings.mlr.press/v202/gao23h.html.