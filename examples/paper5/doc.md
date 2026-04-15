Onflow: a model free, online portfolio allocation algorithm robust to transaction fees
\fnmGabriel \surTurinici1
Gabriel.Turinici@dauphine.fr
\fnmPierre \surBrugiere 2
brugiere@ceremade.dauphine.fr
\orgdivCEREMADE, \orgnameUniversité Paris Dauphine - PSL
\orgaddress\streetPlace du Marechal de Lattre de Tassigny, \cityParis, \postcode75116, \stateParis, \countryFRANCE

Abstract
We introduce Onflow, a reinforcement learning method for optimizing portfolio allocation via gradient flows. Our approach dynamically adjusts portfolio allocations to maximize expected log returns while accounting for transaction costs. Using a softmax parameterization, Onflow updates allocations through an ordinary differential equation derived from gradient flow methods. This algorithm belongs to the large class of stochastic optimization procedures; we measure its efficiency by comparing our results to the mathematical theoretical values in a log-normal framework and to standard benchmarks from the ’old NYSE’ dataset.

For log-normal assets with zero transaction costs, Onflow replicates Markowitz optimal portfolio, achieving the best possible allocation. Numerical experiments from the ’old NYSE’ dataset show that Onflow leads to dynamic asset allocation strategies whose performances are: a) comparable to benchmark strategies such as Cover’s Universal Portfolio or Helmbold et al. “multiplicative updates” approach when transaction costs are zero, and b) better than previous procedures when transaction costs are high. Onflow can even remain efficient in regimes where other dynamical allocation techniques do not work anymore.

Onflow is a promising portfolio management strategy that relies solely on observed prices, requiring no assumptions about asset return distributions. This makes it robust against model risk, offering a practical solution for real-world trading strategies.

keywords: portfolio allocation, Cover’s universal portfolio, EG algorithm, constant rebalanced portfolio, optimal portfolio allocation, asymptotic portfolio performance, reinforcement learning, policy gradient, gradient flows, Old NYSE dataset
1Motivation and literature review
Ever since the advent of modern portfolio theory, reliable information on the statistical properties of the financial time series has been a crucial determinant of the portfolio performance. Formulated in a mean-variance setting, the classical approach of [markovitz_portfolio_theory] promises optimal performance when the future first and second order moments are known. In general this information is highly uncertain and in practice the quality of the result is far from the expected level. To cure this empirical drawback, several approaches have been proposed: [kelly1956new] analyzed optimal bet size in investment portfolios, [black1990asset] modeled the expected return as variables that are updated, by investor convictions, though a Bayesian mechanism, while [cover91] introduced the Universal portfolio to profit from the long term exponential behavior and obtain results that are comparable with the best constant rebalanced portfolio chosen in hindsight. This latter approach uses no assumption whatsoever about the statistical properties of the asset time series and was followed by a large body of literature aiming to produce performances robust to variations in the model parameters. Among such follow-ups we will focus on the online learning approaches which enters the general framework of reinforcement learning, where data is fed directly into a strategy without any model in between. In particular [Helmbold98] proposed a first version using multiplicative updates and a relative cross-entropy loss function, [li_moving_avg_portf_2015] continued along these lines assuming a reversion to the mean while [blum1997universal] explored the theoretical and practical implications of transaction costs. Lastly, [kirby_low_turnover_12] proposed low turnover strategies. On the other hand, [borodin2003can] introduced the Anticor algorithm, which exploits the general idea of correlation between assets. For additional findings on online portfolio selection we refer to the reviews of [li2014online_survey], [sato2019modelfree] and [sun_review_rl_trading2023] while for a more machine learning orientation see [cesa2006prediction] and [book_fin_rl12, Chapter 3]; finally see [li2016olps] for an open source toolbox to test algorithms. More recently, [zhang_combining_2021] proposed a strategy combining different experts, [he_new_2024] made available a literature review and an extension of the Anticor approach using dynamic time warping as a similarity distance; [deep_policy_grad_19] investigated policy gradient style deep reinforcement learning approaches and [ngo_does_2023] compared reinforcement learning and deep learning methods in portfolio optimization.

Remaining in this framework of online3, no-hindsight, reinforcement learning, model-free approaches we present here an algorithm using the gradient flow concept instead of discrete updates that can treat in an intrinsic way the transactions costs. The portfolio allocation is parameterized through a softmax function.

The outline of the paper is the following; in section 2 we introduce the Onflow algorithm; subsequently, in section 3 some theoretical results are presented. In section 4 we test the performance of the procedure on several benchmarks from the literature and in section 5 we conclude with additional remarks.

2Onflow algorithm: intuition and formal definition
Consider a market 
ℳ
 containing 
K
 financial assets and 
T
 time instants 
t
∈
𝒯
:=
{
1
,
…
,
T
}
; 
T
 can be either finite or infinite. We denote 
S
t
k
 the value at time 
t
 of the asset 
k
 and assume 
S
0
k
=
1
,
S
t
k
>
0
,
∀
k
,
t
. The price relatives 
f
t
k
 are defined as 
f
t
k
=
S
t
k
/
S
t
−
1
k
, 
∀
t
∈
𝒯
.

A portfolio is characterized by a set of 
K
 weights 
π
=
(
π
​
(
1
)
,
…
,
π
​
(
K
)
)
. At any time 
t
 the quotient of the wealth invested in the asset 
k
 with respect to total portfolio value is set to 
π
​
(
k
)
 which means that the 
π
​
(
k
)
 sum up to one. We suppose that each 
π
​
(
k
)
 is positive, i.e., no short selling is allowed. In this case 
π
 belongs to the unit simplex 
𝒮
K
 of dimension 
K
 :

𝒮
K
=
{
w
=
(
w
k
)
k
=
1
K
∈
ℝ
K
:
w
k
≥
0
,
∑
k
=
1
K
w
k
=
1
}
.
(1)
We will denote 
𝒮
K
̊
 the interior of 
𝒮
K
 i.e.

𝒮
K
̊
=
{
w
=
(
w
k
)
k
=
1
K
∈
ℝ
K
:
w
k
>
0
,
∑
k
=
1
K
w
k
=
1
}
.
(2)
When 
π
 is constant over time, we obtain the so called Constant Rebalanced Portfolio (CRP) also called a ’Constant Mix’ portfolio. Note that a CRP is a dynamic investment strategy because the price evolution may induce a shift in the proportions 
π
 which have to be reset to the prescribed values.

We denote 
f
t
 the vector with components 
f
t
k
, 
k
≤
K
, 
t
∈
𝒯
. A portfolio with initial value 
𝒱
0
​
(
π
)
 at 
t
=
0
 and weights 
π
t
 chosen at time 
t
−
1
 has the value 
𝒱
t
​
(
π
)
 at time 
t
 with :

𝒱
0
​
(
π
)
=
1
,
∀
t
∈
𝒯
:
𝒱
t
​
(
π
)
=
𝒱
0
​
(
π
)
​
∏
s
=
1
t
⟨
π
s
,
f
s
⟩
=
𝒱
0
​
(
π
)
​
e
∑
s
=
1
t
ln
⁡
(
⟨
π
s
,
f
s
⟩
)
.
(3)
As a side remark, note that formula (3) can also be written

ln
⁡
(
𝒱
t
​
(
π
)
)
=
ln
⁡
(
𝒱
0
​
(
π
)
)
+
∑
s
=
1
t
ln
⁡
(
⟨
π
s
,
f
s
⟩
)
=
ln
⁡
(
𝒱
0
​
(
π
)
)
+
t
⋅
∑
s
=
1
t
ln
⁡
(
⟨
π
s
,
f
s
⟩
)
t
,
(4)
and, if we interpret 
(
π
s
,
f
s
)
 to be samples from some joint distribution denoted 
(
π
,
f
)
 we recognize in 
∑
s
=
1
t
ln
⁡
(
⟨
π
s
,
f
s
⟩
)
t
 an empirical estimator for 
𝔼
​
[
ln
⁡
(
⟨
π
,
f
⟩
)
]
.

These manipulations are useful to write the problem of maximizing the final value in the form of maximizing an average, which is the usual formalism in Reinforcement Learning frameworks.

2.1Reinforcement learning framework
Reinforcement learning (abbreviated ’RL’ from now on, see [sutton_reinforcement_2018, Chapter 3] for a pedagogical introduction) can be used in some situations when model-free approaches are necessary for problems involving repeated decisions, such as game play, robot maneuvering, autonomous car driving, etc.

For the reader already versed in reinforcement learning we provide below the transcription of our setting into the formal writing of a RL problem which involves :

• a sequence of time instants: for us will be 
𝒯
• a state of the world at each time instant 
t
: for us this will be the allocation 
π
t
 and the portfolio value 
𝒱
t
​
(
π
)
• a set of actions to chose from at time 
t
: for us this is 
𝒮
K
 where 
π
t
+
1
 belongs
• rewards 
r
t
 obtained at each time 
t
 depending on previous actions, see below for the precise choice we make. Note that it is not necessary for the reward 
r
t
 to result deterministically from the actions.
• a strategy to choose the next action: the general prescription in reinforcement learning is to choose a probability law on the set of actions, i.e., a distribution in 
𝒮
K
.
Then the problem is formalized as :

 choose iteratively 
​
π
t
+
1
​
 to maximize the expected value of the rewards 
​
𝔼
​
[
r
t
]
.
(5)
This formulation can be framed in the general set of ‘Policy Gradient’ approaches, see [sutton_reinforcement_2018, Section 2.8 and Chapter 13].

Remark 1. Compared with the reinforcement learning literature we consider that the rewards are not discounted, i.e., a reward 
r
 at time 
s
 is worth as much as a reward 
r
 at some other time. Such discounting is often used when the quantity to optimize would be infinite but increasing sub-exponentially.
A possible choice for the rewards 
r
t
 are the portfolio gains from time 
t
−
1
 to 
t
. This may not be a good idea because the increase could be exponential and even discounting may not help to make it finite. In view of the relation (3) above and in coherence with existing literature, it is more natural to look for procedures that maximize the expected value of 
r
t
=
ln
⁡
(
⟨
π
t
,
f
t
⟩
)
; for instance [Helmbold98] chooses 
π
t
+
1
 to maximize this expected value using a particular choice of multiplicative updates derived from an approximation of the relative entropy to the first order. We will subscribe to the same convention but we add to 
r
t
 a term to model the transactions costs as explained below.

2.2The Onflow algorithm
We therefore look for iterative procedures that starting from the state of the portfolio and of the market 
ℳ
 up to time 
t
 adjusts 
π
t
 into some 
π
t
+
1
 with better expected rewards. In coherence with the extensive literature on the gradient flows [jko], it is natural to also require 
π
t
+
1
 to be somehow close to 
π
t
. Various ways to impose this proximity are possible, most of them exploiting the fact that 
π
 is a discrete probability law on the set 
{
1
,
…
,
K
}
 for instance [Helmbold98] uses relative cross-entropy. We will parameterize 
𝒮
K
 through the "softmax" function, denoted 
S
​
(
⋅
)
 and defined by :

S
:
ℝ
K
→
𝒮
K
,
H
∈
ℝ
K
↦
S
(
H
)
=
π
∈
𝒮
K
,
π
(
k
)
=
e
H
k
∑
ℓ
e
H
ℓ
.
(6)
Remark 2. A limited amount of short selling can be easily accommodated by taking as portfolio allocation not 
S
​
(
H
)
 but 
π
λ
=
(
1
+
λ
)
​
S
​
(
H
)
−
λ
/
K
, with 
λ
>
0
 a fixed value; the entries sum up to 
1
 but 
π
λ
 is not always in 
𝒮
K
 as it can have negative entries not exceeding 
λ
/
K
.
Let us denote with these new variables our reward function :

F
t
​
(
H
)
:=
ln
⁡
(
⟨
S
​
(
H
)
,
f
t
⟩
)
.
(7)
So, 
H
t
+
1
 could be chosen to maximize 
F
t
 as a posterior best choice and is expected to be close to 
H
t
 (one single new observation should not generate a complete change of strategy). Note that one of the reasons why we expect 
H
t
+
1
 to stay close to 
H
t
 is because the transition from 
H
t
 to 
H
t
+
1
 can be costly in terms of transaction fees. We will consider proportional transaction fees that charge a given, known, percentage of the amount sold or bought; note that in this transaction fee model moving an amount 
X
 from one asset to the other will cost twice this percentage because both buying and selling are taxed; see also [blum1997universal] for additional discussions on the transaction fees models and for some optimizations that occur. We will not consider here such buy/sell optimization and to make things comparable with the literature we resume everything to a fee level 
ξ
>
0
 and consider that for a portfolio of value 
V
 switching from allocation 
π
~
 to 
π
 incurs a fee 
ξ
​
V
​
∑
k
|
π
~
​
(
k
)
−
π
​
(
k
)
|
.

The allocation 
π
t
 that was selected at time 
t
−
1
 and before prices at 
t
 were known will drift by itself ’overnight’ because of the price evolution given by the price relatives 
f
t
 ; a simple computation shows that the new allocation that takes into account the prices at time 
t
 is :

π
t
+
=
π
t
⊙
f
t
⟨
π
t
,
f
t
⟩
=
(
π
t
​
(
k
)
​
f
t
​
(
k
)
∑
ℓ
π
t
​
(
ℓ
)
​
f
t
​
(
ℓ
)
)
k
=
1
K
,
⊙
=
 element-wise (Hadamard) product
.
(8)
Rebalancing a portfolio of total value 
V
 whose allocation drifted to 
π
t
+
 to some target allocation 
π
 will lower 
V
 to 
V
−
V
​
ξ
​
∑
k
|
π
t
+
​
(
k
)
−
π
​
(
k
)
|
 i.e. will act by a multiplication with 
1
−
ξ
​
∑
k
|
π
t
+
​
(
k
)
−
π
​
(
k
)
|
≃
e
−
ξ
​
∑
k
|
π
t
+
​
(
k
)
−
π
​
(
k
)
|
 where for the approximation we used that 
ξ
 is small compared to 
1
4. As a technical detail, the absolute value 
|
⋅
|
 above is not smooth enough and may induce numerical instabilities in the computations; to avoid this we regularize it to 
|
⋅
|
2
+
a
2
−
a
; such a function proved to be useful in many areas of machine learning, cf. [pseudo_huber_loss, turinici_radonsobolev_2021] and is sometime called "pseudo-Huber" loss. Replacing the nonsmooth 
|
⋅
|
 term with a pseudo-Huber loss offers several practical benefits in gradient flow dynamics: it ensures differentiability everywhere, including near zero, which improves numerical stability and convergence; moreover the smooth transition from quadratic behavior around zero to linear growth for large 
|
x
|
 provides better conditioning and avoids abrupt gradient changes. In addition this formulation also maintains robustness to outliers while preventing gradient explosions, making it suitable for regularization tasks. Another benefit is that the resulting continuous-time dynamics is well-behaved and easier to integrate, which is critical for stable optimization in real-world applications. For numerical tests we set 
a
=
10
−
6
.

Recalling that we are maximizing the expectation of the logarithm of the rewards, the transaction fees are therefore modeled as :

G
t
​
(
H
)
:=
ξ
​
∑
k
=
1
K
[
𝒮
​
(
H
)
​
(
k
)
−
π
t
+
​
(
k
)
]
2
+
a
2
−
a
.
(9)
With these provisions one can look for 
H
t
+
1
 close to 
H
t
 and that minimizes 
ℱ
t
​
(
H
)
:=
G
t
​
(
H
)
−
F
t
​
(
H
)
; we will define 
H
t
+
1
 as follows: solve for 
u
∈
[
0
,
τ
]
 the ODE 5:

ℋ
​
(
u
=
0
)
=
H
t
,
d
d
​
u
​
ℋ
​
(
u
)
=
−
∇
H
ℱ
t
​
(
ℋ
​
(
u
)
)
,
(10)
then set 
H
t
+
1
=
ℋ
​
(
τ
)
; 
τ
>
0
 is a parameter of our algorithm. Replacing the gradients 
∇
H
F
t
 and 
∇
H
G
t
 we obtain the following ODE :

{
ℋ
​
(
u
=
0
)
=
H
t
d
d
​
u
​
ℋ
​
(
u
)
=
𝒮
​
(
ℋ
​
(
u
)
)
⊙
f
t
⟨
𝒮
​
(
ℋ
​
(
u
)
)
,
f
t
⟩
−
𝒮
​
(
ℋ
​
(
u
)
)
−
ξ
​
(
∑
k
𝒮
​
(
ℋ
​
(
u
)
)
​
(
k
)
−
π
t
+
​
(
k
)
(
𝒮
​
(
ℋ
​
(
u
)
)
​
(
k
)
−
π
t
+
​
(
k
)
)
2
+
a
2
​
𝒮
​
(
ℋ
​
(
u
)
)
​
(
k
)
​
(
𝟙
k
=
b
−
𝒮
​
(
ℋ
​
(
u
)
)
​
(
b
)
)
)
b
=
1
K
.
(11)
We used here the softmax derivation formula for 
S
​
(
⋅
)
:

∂
∂
H
b
​
S
​
(
H
)
​
(
k
)
=
S
​
(
H
)
​
(
k
)
​
(
𝟙
k
=
b
−
S
​
(
H
)
​
(
b
)
)
.
(12)
We can now formally introduce the ’Onflow’ algorithm, described in the Algorithm A1 whose pseudo-code is given below. 6

Algorithm A1 Onflow portfolio allocation algorithm
Inputs: parameter 
τ
>
0
, 
a
 (default value 
a
=
10
−
6
).

Outputs: allocations 
π
t
, 
t
∈
𝒯
.

1:procedure
2:  Set 
t
=
1
, 
H
t
=
0
∈
ℝ
K
.
3:  for 
t
∈
T
 do
4:   read 
f
t
, compute 
π
t
+
 from (8)
5:   solve ODE (11) and set 
H
t
+
1
=
ℋ
​
(
τ
)
, 
π
t
+
1
=
S
​
(
H
t
+
1
)
6:   store 
π
t
+
1
7:  end for
8:end procedure
Remark 3. In general solving the ODE at line 5 is not difficult because the number of assets is in practice not too large (
2
 to 
100
). Should this not be the case, one can try instead an explicit Euler numerical scheme with step 
τ
 which boils down to simple vectors addition.
Remark 4. For comparison, the 
E
​
G
​
(
η
)
 algorithm of [Helmbold98] use instead an update of the form :
H
t
+
1
=
H
t
+
τ
​
f
t
⟨
π
t
,
f
t
⟩
+
c
t
,
(13)
where 
c
t
 is a constant with respect to 
k
≤
K
 but that can change with time. It also corresponds to a Natural Policy Gradient (NPG) algorithm, see [amari_natural_gradient_98] for the seminal work on the natural gradient and [agarwal_theory_2021_cv_policy_grad, Lemma 15] for its formulation in reinforcement learning under the policy gradient framework. Our proposal of using continuous gradient flow updates, implemented through the ODE (11) instead of the discrete EG algorithm, introduces smoother and more controllable updates as it aligns with optimization theory by providing a principled continuous-time approach that ensures convergence under mild conditions. On the other hand the inherent geometry of the softmax formulation improves stability, mitigating overshooting and collapse that can occur with naive updates. Moreover, gradient flow balances exploration and exploitation more effectively than direct parameter shifts. Finally, this approach connects naturally to mirror descent and KL-based regularization, offering a theoretically grounded framework widely adopted in reinforcement learning and probabilistic optimization, cf. [sutton_reinforcement_2018].

Remark 5. The price relatives 
f
t
 are stochastic in nature and the maximization of the performance needs to take into account this fact. The standard way to deal with such circumstance is to use a stochastic optimization algorithm, variant of the Stochastic Gradient Descent introduced in [robbins_stochastic_1951]; see [sutton_reinforcement_2018] for its use in reinforcement learning in general and [gabriel_turinici_convergence_2023] for a short self-contained convergence proof. When optimizing a general function 
ℱ
​
(
x
)
 this optimization algorithm converges even if, instead of the true gradient 
∇
ℱ
​
(
x
)
 only a non-biased version is used at each step instead; in practice, to lower the variance of the error, a sample average based on 
B
 non-biased gradients can be used. This means that instead of advancing 
1
 step at the time one can advance 
B
 steps and adapt formula (11) to take into account a sample average of price relatives 
f
t
,…, 
f
t
+
B
. Note that the algorithm, as written above, corresponds to 
B
=
1
.
3Theoretical convergence results
We present in this section a convergence result which shows that the Onflow algorithm will reach optimality under some special assumptions. More precisely, we will consider the continuous limit i.e., 
𝒯
=
ℝ
+
, no transaction fees (
ξ
=
0
) and assume that the asset dynamic is log-normal. Of course, this is a simplification because in real life no asset dynamic is exactly log-normal. But, it is still reassuring that in this prototypical situation our algorithm is consistent and provides the expected solution. As in recent works on the convergence of softmax-formulated reinforcement learning problems, see [mei20_cv_softmax_policy, agarwal_theory_2021_cv_policy_grad], we will work in the "true gradient" regime.

We use the following notations for the log-normal dynamics of the assets :

d
​
S
t
k
S
t
k
=
μ
k
​
d
​
t
+
∑
ℓ
=
1
K
σ
k
​
ℓ
​
d
​
z
ℓ
​
(
t
)
,
(14)
where 
z
ℓ
 are independent Brownian motions. Note that in general the drifts 
μ
=
(
μ
k
)
k
=
1
K
 and 
σ
=
(
σ
k
​
ℓ
)
k
,
ℓ
=
1
K
 are unknown. The covariance matrix will be denoted 
Σ
=
σ
T
​
σ
. Since for any 
T
≥
0
 :

𝔼
​
[
ln
⁡
(
𝒱
T
​
(
π
)
)
]
=
𝔼
​
[
ln
⁡
(
𝒱
0
​
(
π
)
)
]
+
∫
0
T
d
d
​
t
​
𝔼
​
[
ln
⁡
(
𝒱
t
​
(
π
)
)
]
​
𝑑
t
,
(15)
we can formulate as in [cont_time_univ_portf_jamshidian92] the log-optimum portfolio as the continuous maximization over 
𝒮
K
 of 
d
d
​
t
​
𝔼
​
[
ln
⁡
(
𝒱
t
​
(
π
)
)
]
 which means that in this setting 
F
t
​
(
H
)
:=
d
d
​
t
​
𝔼
​
[
ln
⁡
(
𝒱
t
​
(
S
​
(
H
)
)
)
]
. Or, the Ito formula shows that :

F
t
​
(
H
)
=
R
​
(
S
​
(
H
)
)
,
 where 
​
R
​
(
π
)
:=
⟨
μ
,
π
⟩
−
1
2
​
π
T
​
Σ
​
π
.
(16)
Since 
ξ
=
0
 from equations (10) and (16) we obtain that the algorithm corresponds to solving the following ODE :

ℋ
​
(
0
)
=
0
∈
ℝ
K
,
d
d
​
t
​
ℋ
​
(
t
)
=
∇
H
R
​
(
S
​
(
ℋ
​
(
t
)
)
)
​
∀
t
>
0
.
(17)
Output allocation at time 
​
t
:
π
t
=
S
​
(
ℋ
​
(
t
)
)
.
(18)
On the other hand the optimal allocation 
π
⋆
 is the solution of the following problem :

max
π
∈
𝒮
K
⁡
R
​
(
π
)
.
(19)
Remark 6. The class of functionals defined by 
R
λ
​
(
π
)
:=
⟨
μ
,
π
⟩
−
λ
2
​
π
T
​
Σ
​
π
 has as its minimizers the class of the efficient Markowitz portfolios [markovitz_portfolio_theory]. Therefore any solution of the problem (19) is in particular an efficient Markowitz portfolio.
We will need a notation: suppose 
Σ
 is non-singular; for any 
ℒ
⊂
{
1
,
…
,
K
}
,
ℒ
≠
∅
 denote by 
Σ
ℒ
,
ℒ
−
1
 the matrix that, restricted to the indices in 
ℒ
 is the inverse of the 
ℒ
×
ℒ
 minor of 
Σ
 and zero elsewhere 7.

We give now the main result that shows, under appropriate technical hypothesis, that the output allocation 
π
t
 will converge to the optimum allocation 
π
⋆
.

Proposition 1. In the framework above assume that 
Σ
 is non-singular. Then :
1. maximization problem (19) has a unique solution 
π
⋆
∈
𝒮
K
;
2. the reward 
R
t
=
R
​
(
π
t
)
 is monotonically increasing;
3. The output allocation 
(
π
t
)
t
≥
0
 in (18) converges, we denote 
π
∞
:=
lim
t
→
∞
π
t
; in addition
π
∞
∈
𝒮
K
∩
{
𝟙
ℒ
⊙
Σ
−
1
μ
+
1
−
⟨
𝟙
ℒ
,
Σ
−
1
​
μ
⟩
⟨
𝟙
ℒ
,
Σ
ℒ
,
ℒ
−
1
​
𝟙
ℒ
⟩
Σ
ℒ
,
ℒ
−
1
𝟙
ℒ
,
ℒ
⊂
{
1
,
…
,
K
}
,
ℒ
≠
∅
}
;
(20)
4. there exists 
c
ϵ
 depending only on 
Σ
 and 
μ
 such that if 
‖
π
0
−
π
⋆
‖
Σ
≤
c
ϵ
 then 
lim
t
→
∞
π
t
=
π
⋆
;
5. for general initial value 
π
0
, not necessarily close to 
π
⋆
, if 
π
∞
∈
𝒮
K
̊
 then 
π
⋆
∈
𝒮
K
̊
 and 
lim
t
→
∞
π
t
=
π
⋆
. Moreover, in this case the convergence is exponential i.e. there exists 
c
0
,
c
1
>
0
 such that :
‖
π
t
−
π
⋆
‖
≤
c
0
​
e
−
c
1
​
t
,
∀
t
≥
0
.
(21)
Proof.Proof of step 1 : Note that when 
Σ
 is non singular the maximum in (19) is necessarily unique because 
Σ
 will be strictly positive definite so the maximization problem involves a strictly convex function on the closed convex domain 
𝒮
K
.
Since 
Σ
 is non-singular, we can assign 
π
†
:=
Σ
−
1
​
μ
. Note that in general 
π
†
 is not in 
𝒮
K
: entries may be negative and their sum is not necessarily equal to 
1
. We also introduce the norm 
‖
x
‖
Σ
2
=
⟨
Σ
​
x
,
x
⟩
. Then

R
​
(
π
)
=
1
2
​
⟨
Σ
​
π
†
,
π
†
⟩
−
⟨
Σ
​
π
−
π
†
,
π
−
π
†
⟩
=
1
2
​
‖
π
†
‖
Σ
2
−
1
2
​
‖
π
−
π
†
‖
Σ
2
.
(22)
This means that in particular 
π
⋆
 will be the projection of 
π
†
 on 
𝒮
K
 with respect to the norm 
∥
⋅
∥
Σ
2
.

Proof of step 2 : From (17) we derive :

d
d
​
t
​
R
​
(
π
t
)
=
d
d
​
t
​
R
​
(
S
​
(
ℋ
​
(
t
)
)
)
=
⟨
∇
H
R
​
(
S
​
(
ℋ
​
(
t
)
)
)
,
d
d
​
t
​
ℋ
​
(
t
)
⟩
=
‖
∇
H
R
​
(
S
​
(
ℋ
​
(
t
)
)
)
‖
2
≥
0
,
(23)
thus 
R
​
(
π
t
)
 is increasing.

Proof of step 20 : From the definition of 
π
†
 we obtain 
∇
π
R
​
(
π
)
=
Σ
​
(
π
†
−
π
)
. For any column vector 
ζ
∈
ℝ
K
 we introduce the matrix 
ℌ
​
(
ζ
)
=
d
​
i
​
a
​
g
​
(
ζ
)
−
ζ
​
ζ
T
. Note that 
ℌ
​
(
ζ
)
 acts on a vector 
v
 by 
ℌ
​
(
ζ
)
​
v
=
ζ
⊙
(
v
−
v
¯
​
𝟙
)
 with 
v
¯
=
⟨
ζ
,
v
⟩
. The softmax derivation rule (12) can be written as : 
∇
H
S
​
(
H
)
=
ℌ
​
(
S
​
(
H
)
)
. We obtain

∇
H
R
​
(
S
​
(
ℋ
​
(
t
)
)
)
=
∇
H
π
t
​
∇
π
R
​
(
π
t
)
=
−
ℌ
​
(
π
t
)
​
Σ
​
(
π
t
−
π
†
)
.
(24)
So finally, 
π
t
 satisfies the following equation

d
d
​
t
​
π
t
=
∇
H
π
t
​
d
d
​
t
​
ℋ
​
(
t
)
=
−
ℌ
2
​
(
π
t
)
​
Σ
​
(
π
t
−
π
†
)
.
(25)
In (25) there is no direct dependence of 
ℋ
​
(
t
)
 but only of 
π
t
, so (25) can be considered an autonomous ODE involving 
π
. This ODE leaves invariant 
𝒮
K
̊
 i.e., if 
π
0
∈
𝒮
K
̊
 then 
π
t
∈
𝒮
K
̊
 
∀
t
≥
0
; to see this it is enough to switch back to the 
ℋ
 formulation and to invoke the uniqueness of the solution. In fact the whole 
𝒮
K
 will be invariant for (25) : for instance direct computations show that if 
π
t
​
(
k
)
=
0
 then 
(
d
d
​
t
​
π
t
)
​
(
k
)
=
0
 so 
π
t
​
(
k
)
 will not change sign; in addition the linear constraint 
⟨
𝟙
,
π
t
⟩
=
1
 remains true by continuity. We invoke now LaSalle’s invariance principle for the dynamical system (25) set on 
𝒮
K
 and Lyapunov function 
V
​
(
π
)
=
−
R
​
(
π
)
. We saw from (23) that

V
˙
​
(
π
)
=
−
‖
ℌ
​
(
π
)
​
Σ
​
(
π
−
π
†
)
‖
2
≤
0
,
∀
π
∈
𝒮
K
.
(26)
Consider now the set 
E
=
{
π
∈
𝒮
K
:
V
˙
​
(
π
)
=
0
}
. Any 
π
∈
E
 will satisfy 
ℌ
​
(
π
)
​
Σ
​
(
π
−
π
†
)
=
0
 or equivalently 
π
​
(
k
)
​
(
v
k
−
v
¯
⋅
𝟙
)
=
0
 for all 
k
≤
K
, where 
v
=
Σ
​
(
π
−
π
†
)
 and 
v
¯
=
⟨
π
,
v
⟩
. Denote 
ℒ
=
{
k
≤
K
:
π
​
(
k
)
≠
0
}
. Previous relation means that 
∀
k
∈
ℒ
:
v
k
=
v
¯
, i.e. 
𝟙
ℒ
⊙
v
=
c
⋅
𝟙
ℒ
 with 
c
 a constant. Replacing 
v
 with its definition we obtain 
𝟙
ℒ
⊙
Σ
​
(
π
−
π
†
)
=
c
⋅
𝟙
ℒ
 and furthermore 
π
=
𝟙
ℒ
⊙
π
†
+
c
​
Σ
ℒ
,
ℒ
−
1
​
𝟙
ℒ
. After taking the scalar product with 
𝟙
ℒ
 we obtain 
c
=
1
−
⟨
𝟙
ℒ
,
π
†
⟩
⟨
𝟙
ℒ
,
Σ
ℒ
,
ℒ
−
1
​
𝟙
ℒ
⟩
 and therefore

π
=
𝟙
ℒ
⊙
π
†
+
1
−
⟨
𝟙
ℒ
,
π
†
⟩
⟨
𝟙
ℒ
,
Σ
ℒ
,
ℒ
−
1
​
𝟙
ℒ
⟩
​
Σ
ℒ
,
ℒ
−
1
​
𝟙
ℒ
.
(27)
This implies that 
E
 is discrete with at most 
2
K
−
1
 elements, one for each possible 
ℒ
⊂
{
1
,
…
,
K
}
, 
ℒ
≠
∅
. By LaSalle’s principle 
π
t
 approaches 
E
 but since 
E
 is discrete 
π
t
 will even converge to some point of 
E
 denoted 
π
∞
.

Proof of step 4 : by strict convexity, 
R
​
(
ζ
)
<
R
​
(
π
⋆
)
 for any 
ζ
∈
E
, 
ζ
≠
π
⋆
. Since the reward is increasing, should 
π
0
 be close enough to 
π
⋆
 then 
R
​
(
π
0
)
>
R
​
(
ζ
)
,
∀
ζ
∈
E
,
ζ
≠
π
⋆
; since 
R
​
(
π
t
)
 is monotonically increasing, 
π
t
 cannot converge to any such 
ζ
. The only point left to converge is 
π
⋆
. This proves in particular that 
π
⋆
∈
E
.

Proof of step 5 : Since 
π
∞
∈
𝒮
K
̊
 the support 
ℒ
 of 
π
∞
 is 
ℒ
=
{
1
,
…
,
K
}
; then by the formula (27)

π
∞
=
π
†
+
1
−
⟨
𝟙
,
π
†
⟩
⟨
𝟙
,
Σ
−
1
​
𝟙
⟩
​
Σ
−
1
​
𝟙
.
(28)
But the right hand side of (28) is the definition of the minimum of 
R
​
(
x
)
 under the sole constraint that 
⟨
x
,
𝟙
⟩
=
1
. The set of such 
x
 is larger than 
𝒮
K
 but if the minimum belongs to 
𝒮
K
 it will also be the best among elements of 
𝒮
K
 so 
π
∞
=
π
⋆
.

We now prove the exponential convergence. Since 
ℌ
​
(
π
t
)
​
𝟙
=
0
 for any 
π
t
∈
𝒮
K
 we can write :

ℌ
​
(
π
t
)
​
Σ
​
(
π
t
−
π
†
)
=
ℌ
​
(
π
t
)
​
Σ
​
(
π
t
−
π
⋆
+
c
​
Σ
−
1
​
𝟙
)
=
ℌ
​
(
π
t
)
​
Σ
​
(
π
t
−
π
⋆
)
+
c
​
ℌ
​
(
π
t
)
​
𝟙
=
ℌ
​
(
π
t
)
​
Σ
​
(
π
t
−
π
⋆
)
,
(29)
where 
c
 is the constant in (28). Since 
π
t
→
π
⋆
 and 
π
⋆
∈
𝒮
K
̊
 there exists some 
b
>
0
 small enough and 
t
b
 large enough such that 
π
t
​
(
k
)
≥
b
 for all 
k
≤
K
 and 
t
≥
t
a
. Let us compute

d
d
​
t
​
1
2
​
⟨
Σ
​
(
π
t
−
π
⋆
)
,
π
t
−
π
⋆
⟩
=
⟨
Σ
​
(
π
t
−
π
⋆
)
,
d
d
​
t
​
π
t
⟩
=
−
⟨
Σ
​
(
π
t
−
π
⋆
)
,
ℌ
2
​
(
π
t
)
​
Σ
​
(
π
t
−
π
⋆
)
⟩
(30)
=
−
‖
ℌ
​
(
π
t
)
​
Σ
​
(
π
t
−
π
⋆
)
‖
2
Denote 
v
=
Σ
​
(
π
t
−
π
⋆
)
; then :

‖
ℌ
​
(
π
t
)
​
Σ
​
(
π
t
−
π
⋆
)
‖
2
=
‖
ℌ
​
(
π
t
)
​
v
‖
2
=
‖
π
t
⊙
(
v
−
⟨
π
t
,
v
⟩
)
⋅
𝟙
‖
2
≥
b
2
​
‖
v
−
⟨
π
t
,
v
⟩
⋅
𝟙
‖
2
,
∀
t
≥
t
b
.
(31)
Furthermore, for any vector 
v
 the mapping 
γ
∈
ℝ
↦
‖
v
−
γ
⋅
𝟙
‖
2
 is minimized for 
γ
=
⟨
𝟙
,
v
⟩
⟨
𝟙
,
𝟙
⟩
 and therefore 
‖
v
−
⟨
π
t
,
v
⟩
⋅
𝟙
‖
2
≥
‖
v
−
⟨
𝟙
,
v
⟩
⟨
𝟙
,
𝟙
⟩
⋅
𝟙
‖
2
.

In the compact domain 
{
w
∈
ℝ
K
:
‖
w
‖
=
1
,
⟨
w
,
𝟙
⟩
=
0
}
 the function 
w
↦
‖
Σ
​
w
−
⟨
𝟙
,
Σ
​
w
⟩
⟨
𝟙
,
𝟙
⟩
⋅
𝟙
‖
2
 has a positive minimum. If this minimum is zero then it is attained for 
w
⋆
 such that 
Σ
​
w
⋆
=
⟨
𝟙
,
Σ
​
w
⋆
⟩
⟨
𝟙
,
𝟙
⟩
​
𝟙
 thus 
w
⋆
=
⟨
𝟙
,
Σ
​
w
⋆
⟩
⟨
𝟙
,
𝟙
⟩
​
Σ
−
1
​
𝟙
; but 
0
=
⟨
𝟙
,
w
⋆
⟩
=
⟨
𝟙
,
Σ
​
w
⋆
⟩
⟨
𝟙
,
𝟙
⟩
​
⟨
𝟙
,
Σ
−
1
​
𝟙
⟩
. Since 
Σ
 is positive definite 
⟨
𝟙
,
Σ
−
1
​
𝟙
⟩
≠
0
 and we conclude that 
⟨
𝟙
,
Σ
​
w
⋆
⟩
=
0
 which shows that in fact 
Σ
​
w
⋆
=
0
 thus 
w
⋆
=
0
 in contradiction with the requirement that 
‖
w
⋆
‖
=
1
. So, we can conclude that the minimum is not null. Denote it by 
m
>
0
; 
m
 only depends on the matrix 
Σ
. When 
⟨
w
,
𝟙
⟩
=
0
 but 
‖
w
‖
 is not necessarily equal to one the relationship becomes, by proportionality : 
‖
Σ
​
w
−
⟨
𝟙
,
Σ
​
w
⟩
⟨
𝟙
,
𝟙
⟩
⋅
𝟙
‖
2
≥
m
​
‖
w
‖
2
. Take now the particular value 
w
=
π
t
−
π
⋆
, that has indeed 
⟨
w
,
𝟙
⟩
=
0
. Recall that 
v
=
Σ
​
w
 and, thus 
‖
v
−
⟨
𝟙
,
v
⟩
⟨
𝟙
,
𝟙
⟩
⋅
𝟙
‖
2
≥
m
​
‖
π
t
−
π
⋆
‖
2
; since 
Σ
 is non-singular we obtain finally from all the above considerations, equation (30) and (31) that 
d
d
​
t
​
1
2
​
⟨
Σ
​
(
π
t
−
π
⋆
)
,
π
t
−
π
⋆
⟩
≤
−
b
2
​
m
​
‖
π
t
−
π
⋆
‖
2
≤
−
c
m
​
⟨
Σ
​
(
π
t
−
π
⋆
)
,
π
t
−
π
⋆
⟩
 for some 
c
m
>
0
 and all 
t
≥
t
b
. It follows that the norm 
⟨
Σ
​
(
π
t
−
π
⋆
)
,
π
t
−
π
⋆
⟩
 converges exponentially to zero and by norm equivalence also does 
‖
π
t
−
π
⋆
‖
2
. ∎

Remark 7. The hypothesis are mostly technical and can be weakened. In particular one can prove that 
π
⋆
 is the only stable critical point for the 
π
t
 dynamics so (numerically) 
lim
t
→
∞
π
t
=
π
⋆
 even without the hypothesis in step 5.
Remark 8. Proposition 1 assumes zero transaction costs. In practice, such costs exist but are typically an order of magnitude smaller than the other terms in the ODE; they can therefore be incorporated through a perturbation analysis using standard results such as Gronwall’s lemma [gronwall_lemma]. This does not imply that transaction costs have a negligible impact on the final portfolio value, only that the allocation can remain close to optimal. The total portfolio value still depends on turnover and is empirically analyzed in the next section (see Figure 3).
Finally, even if the theoretical result does not go beyond Gaussian return distributions, we will see empirically that the algorithm performs satisfactory even for distributions with non-negligible kurtosis (’heavy tails’), see statistics in Table 1.

In full rigor, a proof of the Proposition 1 in presence of non-zero transaction costs and non-Gaussian distributions would be interesting but we leave it for future work.

4Numerical results and discussion
To implement the Onflow algorithm A1, one has to select the dataset, the fee level 
ξ
, specify the parameter 
τ
 and solve ODE (11). The ODE resolution is very robust with respect to the method used; in practice we employed the odeint routine from the SciPy Python package, see [2020SciPy-NMeth]. No special option was used and all other parameters are left to their default settings.

For the numerical tests we use the "Old NYSE" database, a benchmark from the literature listing the prices of 
36
 stocks quoted on the New York Stock Exchange from 
1965
 to 
1987
 (
5651
 daily prices i.e., 
T
=
5650
), see [cover91, Helmbold98, kalai2002efficient] and [marigold_github_up, the "nyse_o.csv" file]. We take pairs of assets as described in Table 1 which reproduces the presentation from [dochow_proposed_2016, p. 122]. All distributions display positive excess kurtosis (’heavy tails’) significant to p-value 
≤
0.001
 (see also Remark 9).

Table 1:Descriptions of the pairs tested in section 4. The ’correlation’ row refers to the correlation between price relatives 
f
t
1
 and 
f
t
2
 (not between absolute prices 
S
t
1
 and 
S
t
2
).
No.	1	2	3	4
Asset names	 
Commercial Metals
Kin Ark
 	 
Iroquois
Kin Ark
 	 
Coca Cola
IBM
 	 
Commercial Metals
Meicco
 
Correlation	0.064	0.041	0.388	0.067
Individual	52.02	8.92	13.36	52.02
performances	4.13	4.13	12.21	22.92
Individual	40.32%	54.45%	22.24%	40.32%
volatilities	79.04%	79.04%	21.23%	48.93%
Individual	0.0222	0.0142	0.0193	0.0222
excess kurtosis	0.0112	0.0112	0.0103	0.0316
Description	 
Volatile, stagnant
uncorrelated
 	 
Volatile
uncorrelated
 	 
Non-volatile
highly correlated
 	Volatile
 
In all situations we plot the results for two fee values 
ξ
=
0
 and 
ξ
=
2
%
 and the time evolution of the value of several portfolios : the individual assets, the Cover Universal portfolio labeled ’UP’, the [Helmbold98] portfolio (label ’EG’) with parameter 
η
 set to 
η
=
0.05
 as in the reference and the Onflow portfolio, parameter 
τ
 set to 
0.05
 when 
ξ
=
0
 and 
τ
=
1
 when 
ξ
=
2
%
.89 Note that a transaction fee of 
2
%
 is usually very difficult to handle and the performance of most of the known algorithms collapses in this case. We now review the results presented in Figures 1-9.

Refer to caption
Figure 1:Results for the pair ’Iroquois’ – ’Kin Ark’, fee level=
0
%
: evolution of the UP, EG and Onflow portfolios. EG and Onflow perform similarly, better than UP which in turn is better than the individual assets.
A pair known to provide good performance (cf. [cover91]) is ’Iroquois’ and ’Kin Ark’ (Figures 1 and 2). The individual stocks increase by a factor of 
8.92
 and 
4.13
 respectively, while UP obtains around 
40
 times the initial wealth. Even more, EG and Onflow manage to obtain around 
70
 times the initial wealth, which is a substantial improvement over UP (and individual stocks). Even if Onflow is slightly better than EG, the difference does not seem to be substantial. On the other hand, when the fee level 
ξ
 increases to 
2
%
 the performance of all the portfolios except Onflow degrade to the point of not being superior to that of simple buy-and-hold strategies on individual stocks. This result is consistent with the literature, which highlights the severe impact of the transaction costs on dynamic portfolio strategies. Here, the Onflow parameter 
τ
 was set to 
1
.

Refer to caption
Refer to caption
Figure 2:Results for the pair ’Iroquois’ – ’Kin Ark’, fee level=
2
%
. Top : evolution of the UP, EG and Onflow portfolio. With this fee level only the Onflow portfolio performs better than the individual assets. Bottom : the allocations of the Onflow portfolio.
The cumulative turnover (often called "rotation rate" in fund prospectus) is plotted in Figure 3; when 
ξ
=
0
 the daily portfolio turnover 
∑
t
|
π
t
+
1
−
π
t
+
|
 (mean relative transaction volume) is around 
2
%
 for all strategies UP, EG and Onflow ; when 
ξ
=
2
%
 UP and EG keep the turnover at the same level while Onflow reduces it to 
0.5
%
. This explains the performance of Onflow in this case. Note that a level of daily turnover of 
2
%
 corresponds to over 
500
%
 annual turnover while 
0.5
%
 means about 
125
%
 annually. Over the whole period of 
22
 years, UP and EG have a turnover of around 
100
 times the portfolio value while Onflow has a total turnover 
∼
25
.

Refer to caption
Figure 3:Cumulative turnover for the pair ’Iroquois’ – ’Kin Ark’, fee level=
2
%
: Units are set such that a value of 
1
 corresponds to a 
100
%
 portfolio turnover. For instance the total turnover over the whole period for UP is around 
90
 times the portfolio value (not to be mistaken with 
90
%
!).
Refer to caption
Figure 4:Same results as in Figure 1 for the pair ’Commercial Metals’ – ’Kin Ark’, 
ξ
=
0
%
.
Our second test is the pair ’Commercial Metals’ – ’Kin Ark’ (Figures 4-5). The same general conclusions hold here, with the performance of individual stocks not exceeding 
50
 times initial wealth, Cover UP being above this at around 
80
 while EG and Onflow are above UP at around 
110
 when 
ξ
=
0
. When 
ξ
=
2
%
 the performance deteriorates : UP and EG decrease to 
∼
15
 while Onflow manages to retain cca. 
50
 times initial wealth. In this case the reason is simple : in hindsight the ’Commercial Metals’ has a very impressive performance over the period and the best thing to do it is to passively follow it. This is what the Onflow algorithm manages to do as one can see in the bottom plot of Figure 5 which shows that past the time 
1000
 the allocation of "Commercial Metals" is always superior to that of ’Kin Ark’ and goes often as high as 
80
%
 of the overall portfolio.

Refer to caption
Refer to caption
Figure 5:Same results as in Figure 2 for the pair ’Commercial Metals’ – ’Kin Ark’, 
ξ
=
2
%
.
Refer to caption
Figure 6:Same results as in Figure 1 for the pair ’Commercial Metals’ – ’Meicco’, 
ξ
=
0
%
.
The results for the pair ’Commercial Metals’ – ’Meicco’, are presented in Figures 6 and 7. As before, the impressive performance of the ’Commercial Metals’ stock does not allow for much improvement, with the Onflow algorithm remaining competitive even when fees are taken into account.

